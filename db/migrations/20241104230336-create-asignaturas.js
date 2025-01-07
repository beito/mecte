'use strict';

const { AsignaturasSchema, asignaturasTable } = require('../models/asignaturas.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(asignaturasTable, AsignaturasSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(asignaturasTable);
  }
};
