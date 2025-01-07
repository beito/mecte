'use strict';

const { EvaluacionesSchema, evaluacionesTable } = require('../models/evaluaciones.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(evaluacionesTable, EvaluacionesSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(evaluacionesTable);
  }
};
