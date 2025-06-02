import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecrdeploy from 'aws-cdk-lib/aws-ecr-assets';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as path from 'path';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

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
        props.databasePassword,
      ),
      backupRetention: cdk.Duration.days(7),
      allocatedStorage: 20,
      maxAllocatedStorage: 100,
    });

  }
}
