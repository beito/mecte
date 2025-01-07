const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class UsuariosService extends BaseService {
  constructor() {
    super(models.Usuarios);
  }
}

module.exports = UsuariosService;