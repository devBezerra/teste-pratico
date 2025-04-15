import { defaultTimestampColumns } from 'src/shared/utils/defaultTimestampsColumns';
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumnOptions,
    TableForeignKey,
} from 'typeorm';

export class CreateProductShopTable1744730477740 implements MigrationInterface {
    private readonly defaultTimestampColumns: TableColumnOptions[] =
        defaultTimestampColumns();
    private table = new Table({
        name: 'products_shop',
        columns: [
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'price',
                type: 'numeric',
                precision: 10,
                scale: 2,
            },
            {
                name: 'product_id',
                type: 'INTEGER',
            },
            {
                name: 'shop_id',
                type: 'INTEGER',
            },
            ...this.defaultTimestampColumns,
        ],
    });

    private productIdForeignKey = new TableForeignKey({
        name: 'fk_product_shop_product_id',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
    });

    private shopIdForeignKey = new TableForeignKey({
        name: 'fk_product_shop_shop_id',
        columnNames: ['shop_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shops',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
        await queryRunner.createForeignKeys('products_shop', [
            this.productIdForeignKey,
            this.shopIdForeignKey,
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('products_shop', [
            this.productIdForeignKey,
            this.shopIdForeignKey,
        ]);
        await queryRunner.dropTable(this.table);
    }
}
