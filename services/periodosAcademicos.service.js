const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class PeriodosAcademicosService extends BaseService {
  constructor() {
    super(models.PeriodosAcademicos);
  }

  async getPeriodosAcademicosWithPagination(queryParams) {
    return this.findWithPagination(queryParams, {
      searchFields: ['codigo', 'anios', 'periodo'],
      attributes: ['id', 'codigo', 'anios', 'periodo'],
    });
  }
}

module.exports = PeriodosAcademicosService;