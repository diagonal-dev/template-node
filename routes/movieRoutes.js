// routes/movieRoutes.js
import { Router } from 'express';
import { MovieController } from '../controllers/movieController.js';

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieController({ movieModel });

  // Rutas de la API
  moviesRouter.post('/', movieController.createMovie);
  moviesRouter.get('/', movieController.getMovies);
  moviesRouter.get('/:id', movieController.getMovieById);
  moviesRouter.put('/:id', movieController.updateMovie);
  moviesRouter.delete('/:id', movieController.deleteMovie);

  return moviesRouter;
};
