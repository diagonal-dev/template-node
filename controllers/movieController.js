// controllers/movieController.js
// import Movie from '../models/movie.js';
// TODO: Validate with schema

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }
  // Crear una nueva película
  createMovie = async (req, res) => {
    try {
      const { title, year, director, duration, rate, poster, genre } = req.body;
      const movie = await this.movieModel.create({ title, year, director, duration, rate, poster, genre });
      res.status(201).json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la película', error: error.message });
    }
  };

  // Obtener todas las películas
  getMovies = async (req, res) => {
    try {
      const movies = await this.movieModel.findAll();
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las películas', error: error.message });
    }
  };

  // Obtener una película por ID
  getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await this.movieModel.findByPk(id);
      if (!movie) {
        return res.status(404).json({ message: 'Película no encontrada' });
      }
      res.status(200).json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la película', error: error.message });
    }
  };

  // Actualizar una película por ID
  updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, year, director, duration, rate, poster, genre } = req.body;
    try {
      const movie = await this.movieModel.findByPk(id);
      if (!movie) {
        return res.status(404).json({ message: 'Película no encontrada' });
      }
      movie.title = title || movie.title;
      movie.year = year || movie.year;
      movie.director = director || movie.director;
      movie.duration = duration || movie.duration;
      movie.rate = rate || movie.rate;
      movie.poster = poster || movie.poster;
      movie.genre = genre || movie.genre;
      await movie.save();
      res.status(200).json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la película', error: error.message });
    }
  };

  // Eliminar una película por ID
  deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await this.movieModel.findByPk(id);
      if (!movie) {
        return res.status(404).json({ message: 'Película no encontrada' });
      }
      await movie.destroy();
      res.status(200).json({ message: 'Película eliminada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la película', error: error.message });
    }
  };
}
