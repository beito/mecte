'use strict';

const { UsuariosSchema, usuariosTable } = require('../models/usuarios.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(usuariosTable, UsuariosSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(usuariosTable);
  }
};
