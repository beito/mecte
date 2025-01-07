const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class SubCompetenciasService extends BaseService {
  constructor() {
    super(models.Subcompetencias);
  }

  async getSubCompetenciasWithPagination(queryParams) {
    return this.findWithPagination(queryParams, {
      searchFields: ['codigo', 'descripcion', 'Competencias.codigo'],
      attributes: [
        'id', 
        'codigo', 
        'descripcion',
        'idCompetencia'
      ],
      include: [
        { model: models.Competencias, as: 'Competencias', attributes: ['codigo'], required: true }
      ]
    });
  }
}

module.exports = SubCompetenciasService;