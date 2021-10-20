module.exports = {
    "type": process.env.DB_TYPE,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "host": process.env.DB_HOST,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "extra": {
      ssl: true,
    },
    "migrations": [process.env.TYPEORM_MIGRATION_DIR],
    "entities": [process.env.TYPEORM_ENTITIES],
    "cli": {
      "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR
    }
}