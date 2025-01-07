'use strict';

const { ActividadesSchema, actividadesTable } = require('../models/actividades.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(actividadesTable, ActividadesSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(actividadesTable);
  }
};
