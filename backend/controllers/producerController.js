import express from "express";
import Producer from '../models/Producer.js';

const producersRouter = express.Router();

producersRouter.get('/', async (request, response) => {
  const producers = await Producer.find({});
  response.json(producers);
});

producersRouter.get('/actives', async (request, response) => {
  const producersActives = await Producer.find({state:true});
  response.json(producersActives);
});

producersRouter.post('/', async (request, response, next) => {
  const { name, state, description, slogan } = request.body;

  const producer = new Producer({
    name: name,
    state: state,
    description: description,
    slogan: slogan
  });

  try {
    const savedProducer = await producer.save();
    response.status(201).json(savedProducer);
  } catch (exception) {
    next(exception);
  };
});

producersRouter.delete('/:id', async (request, response) => {
  await Producer.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

producersRouter.put('/', async (request, response, next) => {
  const { name, state, description, slogan } = request.body;

  const producer = {
    name: name,
    state: state,
    description: description,
    slogan: slogan
  };

  try {
    const updateProducer = await Producer.findByIdAndUpdate(request.params.id, producer, { new: true });
    if (!updateProducer) {
      return response.status(404).json({ error: 'Producer not found' });
    };
    response.status(200).json(updateProducer);
  } catch (exception) {
    next(exception);
  };
});

export default producersRouter;
