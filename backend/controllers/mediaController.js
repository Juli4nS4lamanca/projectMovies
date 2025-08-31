import express from 'express';
import Media from '../models/Media.js';
import Director from '../models/Director.js';
import Type from '../models/Type.js';
import Producer from '../models/Producer.js';
import Genre from '../models/Genre.js';

const mediasRouter = express.Router();

mediasRouter.get('/', async (request, response) => {
  const medias = await Media.find({});
  response.json(medias);
});

mediasRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const [director, producer, genre] = await Promise.all([
    Director.findOne({ _id: body.directorId, state: true }),
    Producer.findOne({ _id: body.producerId, state: true }),
    Genre.findOne({ _id: body.genreId, state: true }),
  ]);

  if (!director) {
    return response.status(400).json({ error: 'Director not found' });
  };

  if (!producer) {
    return response.status(400).json({ error: 'Producer not found' });
  };

  if (!genre) {
    return response.status(400).json({ error: 'Genre not found' });
  };
  const media = new Media({
    title: body.title,
    synopsis: body.synopsis,
    urlMovie: body.urlMovie,
    img: body.img,
    release: body.release,
    director: body.directorId,
    type: body.typeId,
    genre: body.genreId,
    producer: body.producerId
  });

  try {
    const savedMedia = await media.save();
    response.status(201).json(savedMedia);
  } catch (exception) {
    next(exception);
  };
});

mediasRouter.delete('/:id', async (request, response) => {
  await Media.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

mediasRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const media = {
    title: body.title,
    synopsis: body.synopsis,
    urlMovie: body.urlMovie,
    img: body.img,
    release: body.release,
    director: body.directorId,
    type: body.typeId,
    genre: body.genreId,
    producer: body.producerId
  };

  try {
    const updateMedia = await Media.findByIdAndUpdate(request.params.id, media, { new: true });
    if (!updateMedia) {
      return response.status(404).json({ error: 'Media not found' });
    };
    response.status(200).json(updateMedia);
  } catch (exception) {
    next(exception);
  };
});

export default mediasRouter;
