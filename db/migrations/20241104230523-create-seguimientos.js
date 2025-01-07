'use strict';

const { SeguimientosSchema, seguimientosTable } = require('../models/seguimientos.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(seguimientosTable, SeguimientosSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(seguimientosTable);
  }
};
