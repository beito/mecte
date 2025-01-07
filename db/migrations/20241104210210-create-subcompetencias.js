'use strict';

const { SubcompetenciasSchema, subcompetenciasTable } = require('../models/subcompetencias.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(subcompetenciasTable, SubcompetenciasSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(subcompetenciasTable);
  }
};
