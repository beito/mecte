const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class DecanosService extends BaseService {
  constructor() {
    super(models.Decanos);
  }

  async getDecanosWithPagination(queryParams) {
    return this.findWithPagination(queryParams, {
      searchFields: ['codigo', 'Facultades.nombre'],
      attributes: [
        'id', 
        'codigo', 
        'idFacultad',
        'idUsuario'
      ],
      include: [
        { model: models.Facultades, as: 'Facultades', attributes: ['nombre'], required: true }
      ]
    });
  }
}

module.exports = DecanosService;