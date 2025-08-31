import express, { request, response } from 'express';
import Type from '../models/Type.js';

const typesRouter = express.Router();

typesRouter.get('/', async (request, response) => {
  const types = await Type.find({});
  response.json(types);
});

typesRouter.post('/', async (request, response, next) => {
  const { name, description } = request.body;

  const type = new Type({
    name: name,
    description: description
  });

  try {
    const savedType = await type.save();
    response.status(201).json(savedType);
  } catch (exception) {
    next(exception);
  };
});

typesRouter.delete('/:id', async (request, response) => {
  await Type.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

typesRouter.put('/:id', async (request, response, next) => {
  const { name, description } = request.body;

  const type = {
    name: name,
    description: description
  };

  try {
    const updateType = await Type.findByIdAndUpdate(request.params.id, type, { new: true });
    if (!updateType) {
      return response.status(404).json({ error: 'Type not found' });
    };
    response.status(200).json(updateType);
  } catch (exception) {
    next(exception);
  };

});

export default typesRouter;
