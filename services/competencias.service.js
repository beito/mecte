const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class CompetenciasService extends BaseService {
  constructor() {
    super(models.Competencias);
  }

  async getCompetenciasWithPagination(queryParams) {
    return this.findWithPagination(queryParams, {
      searchFields: ['codigo', 'descripcion', 'Carreras.nombre'],
      attributes: [
        'id', 
        'codigo', 
        'descripcion',
        'idCarrera'
      ],
      include: [
        { model: models.Carreras, as: 'Carreras', attributes: ['nombre'], required: true }
      ]
    });
  }
}

module.exports = CompetenciasService;