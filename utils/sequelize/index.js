const { Sequelize } = require('sequelize');

const { config } = require('./config');
const { setupModels } = require('../../db/models');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    port: config.dbPort,
    logging: console.log,
    maxConcurrentQueries: config.dbMaxConcurrentQueries,
    dialect: config.dbDialect,
    pool: config.pool,
    language: config.dbLanguage
});

setupModels(sequelize);

module.exports = sequelize;

