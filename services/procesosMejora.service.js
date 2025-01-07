const { Sequelize, Op } = require('sequelize');
const { models } = require('utils/sequelize');
const BaseService = require('./base.service');

class ProcesosMejoraService extends BaseService {
  constructor() {
    super(models.ProcesoMejora);
  }

  async getProcesosMejoraWithPagination(queryParams) {
    const { search } = queryParams;

    let orConditions = [];
    if (search) {
      orConditions.push(
        Sequelize.where(
          Sequelize.fn('to_char', Sequelize.col('fecha_inicio'), 'DD/MM/YYYY'),
          { [Op.like]: `%${search}%` }
        )
      );
      orConditions.push(
        Sequelize.where(
          Sequelize.fn('to_char', Sequelize.col('fecha_fin'), 'DD/MM/YYYY'),
          { [Op.like]: `%${search}%` }
        )
      );
    }

    const baseWhere = orConditions.length > 0
      ? [...orConditions]
      : [];

    return this.findWithPagination(queryParams, {
      searchFields: ['codigo', 'objetivos', 'descripcion', 'Carreras.nombre'],
      attributes: [
        'id', 
        'codigo',
        'objetivos', 
        'descripcion', 
        ['fecha_inicio', 'fechaInicio'], 
        ['fecha_fin', 'fechaFin'], 
        'status', 
        'idCarrera', 
        [Sequelize.fn('to_char', Sequelize.col('fecha_inicio'), 'DD/MM/YYYY'), 'formatedFechaInicio'],
        [Sequelize.fn('to_char', Sequelize.col('fecha_fin'), 'DD/MM/YYYY'), 'formatedFechaFin']
      ],
      include: [
        { model: models.Carreras, as: 'Carreras', attributes: ['nombre'], required: true }
      ],
      baseWhere
    });
  }
}

module.exports = ProcesosMejoraService;