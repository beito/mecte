const express = require('express');

const PeriodosAcademicosService = require('./../services/periodosAcademicos.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createOrUpdatePeriodosAcademicosSchema, getPeriodosAcademicosSchema } = require('./../schemas/periodosAcademicos.schema');

const router = express.Router();
const service = new PeriodosAcademicosService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/data-table', async (req, res, next) => {
  try {
      const { limit, skip, sort, order, search } = req.query;
      const result = await service.getPeriodosAcademicosWithPagination({ limit, skip, sort, order, search });
      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
});

router.get('/:id',
  validatorHandler(getPeriodosAcademicosSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrUpdatePeriodosAcademicosSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getPeriodosAcademicosSchema, 'params'),
  validatorHandler(createOrUpdatePeriodosAcademicosSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getPeriodosAcademicosSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
