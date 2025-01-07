const express = require('express');

const SeguimientosService = require('./../services/seguimientos.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createOrUpdateSeguimientosSchema, getSeguimientosSchema } = require('./../schemas/seguimientos.schema');

const router = express.Router();
const service = new SeguimientosService();

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
      const result = await service.getSeguimientosWithPagination({ limit, skip, sort, order, search });
      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
});

router.get('/:id',
  validatorHandler(getSeguimientosSchema, 'params'),
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
  validatorHandler(createOrUpdateSeguimientosSchema, 'body'),
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
  validatorHandler(getSeguimientosSchema, 'params'),
  validatorHandler(createOrUpdateSeguimientosSchema, 'body'),
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
  validatorHandler(getSeguimientosSchema, 'params'),
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
