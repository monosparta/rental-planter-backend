require('dotenv').config('../.env');

module.exports = {
    development: {
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME || 'plant_manager',
        host: process.env.DEV_DB_HOSTNAME || '127.0.0.1',
        port: process.env.DEV_DB_PORT || 3306,
        dialect: 'mysql',
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME || 'plant_manager',
        host: process.env.CI_DB_HOSTNAME || '127.0.0.1',
        port: process.env.CI_DB_PORT || 3306,
        dialect: 'mysql',
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME || 'plant_manager',
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'mysql',
    },
};