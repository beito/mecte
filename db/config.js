const { config } = require('../utils/sequelize/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.dbDialect}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
    development: {
        url: URI,
        logging: console.log,
        maxConcurrentQueries: config.dbMaxConcurrentQueries,
        dialect: config.dbDialect,
        pool: config.pool,
        language: config.dbLanguage
    },
    production: {
        url: URI,
        logging: console.log,
        maxConcurrentQueries: config.dbMaxConcurrentQueries,
        dialect: config.dbDialect,
        pool: config.pool,
        language: config.dbLanguage
    }
}