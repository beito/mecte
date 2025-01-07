const { Sequelize, Op } = require('sequelize');
const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class ActividadesService extends BaseService {
  constructor() {
    super(models.Actividades);
  }

  async getActividadesWithPagination(queryParams) {
    const { search } = queryParams;

    let orConditions = [];
    if (search) {
      orConditions.push(
        Sequelize.where(
          Sequelize.fn('to_char', Sequelize.col('deadline'), 'DD/MM/YYYY'),
          { [Op.like]: `%${search}%` }
        )
      );
    }

    const baseWhere = orConditions.length > 0
      ? [...orConditions]
      : [];

    return this.findWithPagination(queryParams, {
      searchFields: ['codigo', 'descripcion', 'acciones', 'ProcesoMejora.codigo'],
      attributes: [
        'id', 
        'codigo', 
        'descripcion', 
        'acciones',
        'deadline',
        'status',
        'idProcesoMejora',
        [Sequelize.fn('to_char', Sequelize.col('deadline'), 'DD/MM/YYYY'), 'formatedDeadline']
      ],
      include: [
        { model: models.ProcesoMejora, as: 'ProcesoMejora', attributes: ['codigo'], required: true }
      ],
      baseWhere
    });
  }

}

module.exports = ActividadesService;