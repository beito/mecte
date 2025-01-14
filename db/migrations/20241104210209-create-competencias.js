'use strict';

const { CompetenciasSchema, competenciasTable } = require('../models/competencias.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(competenciasTable, CompetenciasSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(competenciasTable);
  }
};
