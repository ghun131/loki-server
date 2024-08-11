import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDeviceTable1723372194407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'devices',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('devices');
  }
}
