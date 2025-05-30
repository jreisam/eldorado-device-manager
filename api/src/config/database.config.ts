import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USER || 'dmuser',
  password: process.env.DATABASE_PASSWORD || 'dmpasswd',
  database: process.env.DATABASE_NAME || 'dmdb',

  entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',

  retryAttempts: 10,
  retryDelay: 3000,
  connectTimeout: 60000,

  // ssl: {
  //   rejectUnauthorized: false,
  // },

  cache: {
    duration: 30000, // 30 segundos
  },

  extra: {
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
    connectTimeout: 60000,
  },

  migrations: [join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}')],
  migrationsRun: true,
  migrationsTableName: 'migrations',
};

export default typeOrmConfig;
