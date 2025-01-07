const express = require('express');

const ProcesosMejoraService = require('./../services/procesosMejora.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createOrUpdateProcesosMejoraSchema, getProcesosMejoraSchema } = require('./../schemas/procesosMejora.schema');

const router = express.Router();
const service = new ProcesosMejoraService();

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
      const result = await service.getProcesosMejoraWithPagination({ limit, skip, sort, order, search });
      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
});

router.get('/:id',
  validatorHandler(getProcesosMejoraSchema, 'params'),
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
  validatorHandler(createOrUpdateProcesosMejoraSchema, 'body'),
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
  validatorHandler(getProcesosMejoraSchema, 'params'),
  validatorHandler(createOrUpdateProcesosMejoraSchema, 'body'),
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
  validatorHandler(getProcesosMejoraSchema, 'params'),
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
