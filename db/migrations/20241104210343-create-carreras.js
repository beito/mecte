'use strict';

const { CarrerasSchema, carrerasTable } = require('../models/carreras.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(carrerasTable, CarrerasSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(carrerasTable);
  }
};
