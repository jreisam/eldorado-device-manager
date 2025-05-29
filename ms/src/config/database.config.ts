import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USER || 'dmuser',
  password: process.env.DATABASE_PASSWORD || 'dmpasswd',
  database: process.env.DATABASE_NAME || 'dmdb',

  // Entidades - ajuste o caminho conforme a estrutura do seu projeto
  entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],

  // Configurações de sincronização (cuidado em produção)
  synchronize: process.env.NODE_ENV !== 'production',

  // Logging - útil para debug, desabilitado em produção
  logging: process.env.NODE_ENV !== 'production',

  // Configurações de retry para lidar com atrasos na inicialização do banco
  retryAttempts: 10,
  retryDelay: 3000,

  // Configurações adicionais de conexão
  connectTimeout: 60000,
  acquireTimeout: 60000,

  // Configurações de pool de conexões
  poolSize: 10,

  // Configurações de SSL (opcional, remova se não estiver usando SSL)
  // ssl: {
  //   rejectUnauthorized: false,
  // },

  // Configurações de cache (opcional)
  cache: {
    duration: 30000, // 30 segundos
  },

  // Configurações extras específicas do MySQL
  extra: {
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
  },

  // Migrações (opcional, para uso com TypeORM migrations)
  migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
  migrationsRun: false,
  migrationsTableName: 'migrations',
};

export default typeOrmConfig;
