'use strict';

const { FacultadesSchema, facultadesTable } = require('../models/facultades.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(facultadesTable, FacultadesSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(facultadesTable);
  }
};
