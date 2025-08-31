import express from "express";
import Director from "../models/Director.js";

const directorsRouter = express.Router();

directorsRouter.get('/', async (request, response) => {
  const directors = await Director.find({});
  response.json(directors);
});

directorsRouter.get('/actives', async (request, response) => {
  const directorsActives = await Director.find({state: true});
  response.json(directorsActives);
});

directorsRouter.post('/', async (request, response, next) => {
  const { name, state } = request.body;

  const director = new Director({
    name: name,
    state: state
  });

  try {
    const savedDirector = await director.save();
    response.status(201).json(savedDirector);
  } catch (exception) {
    next(exception);
  };
});

directorsRouter.delete('/:id', async (request, response) => {
  await Director.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

directorsRouter.put('/:id', async (request, response, next) => {
  const { name, state } = request.body;

  const director = {
    name: name,
    state: state
  };

  try {
    const updateDirector = await Director.findByIdAndUpdate(request.params.id, director, { new: true });
    if (!updateDirector) {
      return response.status(404).json({ error: 'Director not found' });
    };
    response.status(200).json(updateDirector);
  } catch (exception) {
    next(exception);
  };
});

export default directorsRouter;

