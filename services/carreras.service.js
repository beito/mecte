const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class CarrerasService extends BaseService {
  constructor() {
    super(models.Carreras);
  }

  async getCarrerasWithPagination(queryParams) {
    return this.findWithPagination(queryParams, {
      searchFields: ['codigo', 'nombre', 'Facultades.nombre'],
      attributes: [
        'id',
        'codigo',
        'nombre',
        'idFacultad'
      ],
      include: [
        { model: models.Facultades, as: 'Facultades', attributes: ['nombre'], required: true }
      ]
    });
  }
}

module.exports = CarrerasService;