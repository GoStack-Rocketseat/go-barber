import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterProviderField1587224268132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.changeColumn('appointments', 'provider',
        new TableColumn({
          name: 'provider_id',
          type: 'uuid',
          isNullable: true
        })
      );

      await queryRunner.changeColumn('appointments', 'id',
        new TableColumn({
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()'
        })
      );

      await queryRunner.changeColumn('users', 'id',
        new TableColumn({
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()'
        })
      );

      await queryRunner.createForeignKey('appointments',
        new TableForeignKey({
          name: 'AppointmentProvider',
          columnNames: ['provider_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('appointments', 'AppoimentProvider');

      await queryRunner.changeColumn('users', 'id',
        new TableColumn({
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          default: 'uuid_generate_v4()'
        })
      );

      await queryRunner.changeColumn('appointments', 'id',
        new TableColumn({
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          default: 'uuid_generate_v4()'
        })
      );

      await queryRunner.changeColumn('appointments', 'provider',
        new TableColumn({
          name: 'provider',
          type: 'varchar'
        })
      );

    }

}
