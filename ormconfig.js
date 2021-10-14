module.exports = {
    "type": process.env.TYPEORM_DB_TYPE,
    "database": process.env.TYPEORM_DB_NAME,
    "port": process.env.TYPEORM_DB_PORT,
    "host": process.env.TYPEORM_DB_HOST,
    "username": process.env.TYPEORM_DB_USERNAME,
    "password": process.env.TYPEORM_DB_PASSWORD,
    "migrations": [process.env.TYPEORM_MIGRATION_DIR],
    "entities": [process.env.TYPEORM_ENTITIES],
    "cli": {
      "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR
    }
}