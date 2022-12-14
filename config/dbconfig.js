require('dotenv').config('../.env');

module.exports = {
    development: {
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME || 'rental-planter',
        host: process.env.DEV_DB_HOSTNAME || '127.0.0.1',
        port: parseInt(process.env.DEV_DB_PORT, 10) || 3306,
        dialect: 'mysql'
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME || 'rental-planter',
        host: process.env.CI_DB_HOSTNAME || '127.0.0.1',
        port: parseInt(process.env.CI_DB_PORT, 10) || 3306,
        dialect: 'mysql'
    },
    stage: {
        username: process.env.STAGE_DB_USERNAME,
        password: process.env.STAGE_DB_PASSWORD,
        database: process.env.STAGE_DB_NAME || 'rental-planter',
        host: process.env.STAGE_DB_HOSTNAME || '127.0.0.1',
        port: parseInt(process.env.STAGE_DB_PORT, 10) || 3306,
        dialect: 'mysql'
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME || 'rental-planter',
        host: process.env.PROD_DB_HOSTNAME,
        port: parseInt(process.env.PROD_DB_PORT, 10),
        dialect: 'mysql'
    }
};
