import { defaultTimestampColumns } from '../../shared/utils/defaultTimestampsColumns';
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumnOptions,
} from 'typeorm';

export class CreateProductsTable1744392822492 implements MigrationInterface {
    private readonly defaultTimestampColumns: TableColumnOptions[] =
        defaultTimestampColumns();
    private readonly table = new Table({
        name: 'products',
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
            {
                name: 'cost',
                type: 'numeric',
                precision: 10,
                scale: 2,
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
