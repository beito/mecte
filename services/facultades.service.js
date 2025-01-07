const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class FacultadesService extends BaseService {
  constructor() {
    super(models.Facultades);
  }

  async getFacultadesWithPagination(queryParams) {
    return this.findWithPagination(queryParams, {
      searchFields: ['nombre', 'codigo'],
      attributes: ['id', 'nombre', 'codigo'],
    });
  }
}

module.exports = FacultadesService;