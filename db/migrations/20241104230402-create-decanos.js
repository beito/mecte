'use strict';

const { DecanosSchema, decanosTable } = require('../models/decanos.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(decanosTable, DecanosSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(decanosTable);
  }
};
