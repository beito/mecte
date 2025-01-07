'use strict';

const { ProcesoMejoraSchema, procesoMejoraTable } = require('../models/procesos_mejora.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(procesoMejoraTable, ProcesoMejoraSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(procesoMejoraTable);
  }
};
