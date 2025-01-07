const { Sequelize, Op } = require('sequelize');
const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class SeguimientosService extends BaseService {
  constructor() {
    super(models.Seguimientos);
  }

  async getSeguimientosWithPagination(queryParams) {
    const { search } = queryParams;

    let orConditions = [];
    if (search) {
      orConditions.push(
        Sequelize.where(
          Sequelize.fn('to_char', Sequelize.col('fecha'), 'DD/MM/YYYY'),
          { [Op.like]: `%${search}%` }
        )
      );
    }

    const baseWhere = orConditions.length > 0
      ? [...orConditions]
      : [];

    return this.findWithPagination(queryParams, {
      searchFields: ['descripcion', 'resultados', 'acciones', 'Actividades.codigo'],
      attributes: [
        'id', 
        'descripcion', 
        'resultados', 
        'acciones',
        'fecha',
        'idActividad',
        [Sequelize.fn('to_char', Sequelize.col('fecha'), 'DD/MM/YYYY'), 'formatedFechaSeguimiento']
      ],
      include: [
        { model: models.Actividades, as: 'Actividades', attributes: ['codigo'], required: true }
      ],
      baseWhere
    });
  }
}

module.exports = SeguimientosService;