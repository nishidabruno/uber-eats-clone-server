import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateQuantityColumnOnOrdersProducts1633485880478
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products',
      new TableColumn({
        name: 'quantity',
        type: 'numeric',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders_products', 'quantity');
  }
}
