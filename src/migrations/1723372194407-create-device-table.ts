// Updated migration file: src/migrations/1723372194407-CreateDeviceTable.ts

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDeviceTable1723372194407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'devices',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp without time zone',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // Enable uuid-ossp extension for UUID generation
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('devices');
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
