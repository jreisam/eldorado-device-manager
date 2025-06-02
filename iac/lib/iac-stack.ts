import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecrdeploy from 'aws-cdk-lib/aws-ecr-assets';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as path from 'path';

export interface DeviceManagerStackProps extends cdk.StackProps {
  environment: string;
  databaseUsername: string;
  databasePassword: cdk.SecretValue;
}

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DeviceManagerStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // VPC
    const vpc = new ec2.Vpc(this, 'DeviceManagerVPC', {
      maxAzs: 2,
      natGateways: 1,
    });

    // Grupo de segurança para o banco de dados
    const dbSecurityGroup = new ec2.SecurityGroup(this, 'DBSecurityGroup', {
      vpc,
      description: 'Security group for RDS MySQL database',
      allowAllOutbound: true,
    });

    // Criar instância MySQL
    const database = new rds.DatabaseInstance(this, 'DeviceManagerDB', {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_33,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      securityGroups: [dbSecurityGroup],
      removalPolicy: cdk.RemovalPolicy.SNAPSHOT, // Use SNAPSHOT ou RETAIN para produção
      databaseName: 'dmdb',
      credentials: rds.Credentials.fromPassword(
        props.databaseUsername,
        props.databasePassword
      ),
      backupRetention: cdk.Duration.days(7),
      allocatedStorage: 20,
      maxAllocatedStorage: 100,
    });

    // Criar repositório ECR para o backend
    const backendRepository = new ecr.Repository(this, 'BackendRepository', {
      repositoryName: `eldorado-device-manager-backend-${props.environment}`,
      // Se precisar definir política de exclusão, use:
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      // Outras configurações:
      imageScanOnPush: true,
      lifecycleRules: [
        {
          maxImageCount: 3,
          description: 'Keep only the 5 most recent images'
        }
      ]

    });

    // Criar repositório ECR para o frontend
    const frontendRepository = new ecr.Repository(this, 'FrontendRepository', {
      repositoryName: `eldorado-device-manager-frontend-${props.environment}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      imageScanOnPush: true,
      lifecycleRules: [
        {
          maxImageCount: 3,
          description: 'Keep only the 5 most recent images'
        }
      ]
    });

    // Construir e enviar imagens Docker para ECR
    const backendImage = new ecrdeploy.DockerImageAsset(this, 'BackendDockerImage', {
      directory: path.join(__dirname, '../../'),  // Diretório raiz do projeto
      file: 'api/Dockerfile',
    });

    const frontendImage = new ecrdeploy.DockerImageAsset(this, 'FrontendDockerImage', {
      directory: path.join(__dirname, '../../'),  // Diretório raiz do projeto
      file: 'web/Dockerfile',
    });

    // Criar cluster ECS
    const cluster = new ecs.Cluster(this, 'DeviceManagerCluster', {
      vpc,
      clusterName: `eldorado-device-manager-cluster-${props.environment}`,
      containerInsights: true,
    });

    // Grupo de segurança para serviços ECS
    const ecsSecurityGroup = new ec2.SecurityGroup(this, 'ECSSecurityGroup', {
      vpc,
      description: 'Security group for ECS services',
      allowAllOutbound: true,
    });

    // Permitir que os serviços ECS acessem o banco de dados
    dbSecurityGroup.addIngressRule(
      ecsSecurityGroup,
      ec2.Port.tcp(3306),
      'Allow MySQL access from ECS services'
    );

    // Definir task definition do backend
    const backendTaskDefinition = new ecs.FargateTaskDefinition(this, 'BackendTaskDef', {
      memoryLimitMiB: 1024,
      cpu: 512,
    });

    const backendContainer = backendTaskDefinition.addContainer('BackendContainer', {
      image: ecs.ContainerImage.fromDockerImageAsset(backendImage),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'backend',
        logRetention: logs.RetentionDays.ONE_WEEK,
      }),
      environment: {
        NODE_ENV: 'production',
        DATABASE_HOST: database.dbInstanceEndpointAddress,
        DATABASE_PORT: '3306',
        DATABASE_USER: props.databaseUsername,
        DATABASE_PASSWORD: props.databasePassword.toString(),
        DATABASE_NAME: 'dmdb',
      },
      portMappings: [{ containerPort: 3000 }],
    });

    // Definir task definition do frontend
    const frontendTaskDefinition = new ecs.FargateTaskDefinition(this, 'FrontendTaskDef', {
      memoryLimitMiB: 1024,
      cpu: 512,
    });

    const frontendContainer = frontendTaskDefinition.addContainer('FrontendContainer', {
      image: ecs.ContainerImage.fromDockerImageAsset(frontendImage),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'frontend',
        logRetention: logs.RetentionDays.ONE_WEEK,
      }),
      portMappings: [{ containerPort: 80 }],
    });

    // ECS backend
    const backendService = new ecs.FargateService(this, 'BackendService', {
      cluster,
      taskDefinition: backendTaskDefinition,
      desiredCount: 2,
      securityGroups: [ecsSecurityGroup],
      assignPublicIp: false,
      serviceName: `eldorado-device-manager-backend-${props.environment}`,
    });

    // ECS frontend
    const frontendService = new ecs.FargateService(this, 'FrontendService', {
      cluster,
      taskDefinition: frontendTaskDefinition,
      desiredCount: 2,
      securityGroups: [ecsSecurityGroup],
      assignPublicIp: false,
      serviceName: `eldorado-device-manager-frontend-${props.environment}`,
    });

  }
}
