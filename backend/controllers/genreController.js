import express from "express";
import Genre from "../models/Genre.js";

const genresRouter = express.Router();

genresRouter.get('/', async (request, response) => {
  const genres = await Genre.find({});
  response.json(genres);
});

genresRouter.get('/actives', async(request, response) => {
  const genresActives = await Genre.find({state: true});
  response.json(genresActives);
});

genresRouter.post('/', async (request, response, next) => {
  const { name, state, description } = request.body;

  const genre = new Genre({
    name: name,
    state: state,
    description: description
  });

  try {
    const savedGenre = await genre.save();
    response.status(201).json(savedGenre);
  } catch (exception) {
    next(exception);
  };
});

genresRouter.delete('/:id', async (request, response) => {
  await Genre.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

genresRouter.put('/:id', async (request, response, next) => {
  const { name, state, description } = request.body;

  const genre = {
    name: name,
    state: state,
    description: description
  };

  try {
    const updateGenre = await Genre.findByIdAndUpdate(request.params.id, genre, { new: true });
    if (!updateGenre) {
      return response.status(404).json({ error: 'Genre not found' });
    };
    response.status(200).json(updateGenre);
  } catch (exception) {
    next(exception);
  };
});

export default genresRouter;
