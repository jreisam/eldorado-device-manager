import { MigrationInterface, QueryRunner } from 'typeorm';
import * as path from 'node:path';
import * as fs from 'node:fs';

export class Migrations1748556798626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const sqlFilePath = path.resolve(
        process.cwd(),
        'src',
        'database',
        'sql',
        '00-struct-and-populate.sql',
      );

      console.log('Lendo script SQL de:', sqlFilePath);

      if (!fs.existsSync(sqlFilePath)) {
        throw new Error(`Script SQL não encontrado: ${sqlFilePath}`);
      }

      const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

      const statements = sqlScript
        .split(';')
        .map((statement) => statement.trim())
        .filter((statement) => statement.length > 0);

      for (const statement of statements) {
        await queryRunner.query(statement);
      }
    } catch (error) {
      console.error('Erro na migration:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS devices');
    await queryRunner.query('DROP TABLE IF EXISTS categories');
  }
}
