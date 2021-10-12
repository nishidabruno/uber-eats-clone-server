import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateFKStoreCoordinatesStoreAndChangeLocationColumn1633064350224
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('stores', 'location');
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'coordinates_id',
        type: 'uuid',
      })
    );
    await queryRunner.createForeignKey(
      'stores',
      new TableForeignKey({
        name: 'FKStoreCoordinatesStore',
        columnNames: ['coordinates_id'],
        referencedTableName: 'stores_coordinates',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('stores', 'FKStoreCoordinatesStore');
    await queryRunner.dropColumn('stores', 'coordinates_id');
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'location',
        type: 'varchar',
      })
    );
  }
}
