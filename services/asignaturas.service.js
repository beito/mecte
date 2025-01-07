const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class AsignaturasService extends BaseService {
  constructor() {
    super(models.Asignaturas);
  }

  async getAsignaturasWithPagination(queryParams) {
    return this.findWithPagination(queryParams, {
      searchFields: ['codigo', 'nombre', 'Carreras.nombre'],
      attributes: [
        'id', 
        'codigo', 
        'nombre',
        'idCarrera'
      ],
      include: [
        { model: models.Carreras, as: 'Carreras', attributes: ['nombre'], required: true }
      ]
    });
  }
}

module.exports = AsignaturasService;