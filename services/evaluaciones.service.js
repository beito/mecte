const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class EvaluacionesService extends BaseService {
  constructor() {
    super(models.Evaluaciones);
  }

  async getEvaluacionesWithPagination(queryParams) {
    return this.findWithPagination(queryParams, {
      searchFields: ['nivel', 'Subcompetencias.descripcion', 'Asignaturas.nombre', 'PeriodosAcademicos.codigo'],
      attributes: [
        'id', 
        'puntaje', 
        'nivel',
        'idSubcompetencia',
        'idAsignatura',
        'idPeriodoAcademico'
      ],
      include: [
        { model: models.Subcompetencias, as: 'Subcompetencias', attributes: ['descripcion'], required: true },
        { model: models.Asignaturas, as: 'Asignaturas', attributes: ['nombre'], required: true },
        { model: models.PeriodosAcademicos, as: 'PeriodosAcademicos', attributes: ['codigo'], required: true }
      ]
    });
  }
}

module.exports = EvaluacionesService;