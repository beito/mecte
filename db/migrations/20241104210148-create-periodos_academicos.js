'use strict';

const { PeriodosAcademicosSchema, periodosAcademicosTable } = require('../models/periodos_academicos.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(periodosAcademicosTable, PeriodosAcademicosSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(periodosAcademicosTable);
  }
};
