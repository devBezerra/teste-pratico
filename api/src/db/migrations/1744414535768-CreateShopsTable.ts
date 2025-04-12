import { defaultTimestampColumns } from '../../shared/utils/defaultTimestampsColumns';
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumnOptions,
} from 'typeorm';

export class CreateShopsTable1744414535768 implements MigrationInterface {
    private readonly defaultTimestampColumns: TableColumnOptions[] =
        defaultTimestampColumns();
    private readonly table = new Table({
        name: 'shops',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'description',
                type: 'varchar',
                length: '60',
            },
            ...this.defaultTimestampColumns,
        ],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }
}
