// models/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

export const MovieModel = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false, // equivalent to 'required_error' in Zod
    validate: {
      notEmpty: { msg: 'Movie title is required.' },
    },
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Year must be an integer.' },
      min: {
        args: [1900],
        msg: 'Year must be at least 1900.',
      },
      max: {
        args: [2024],
        msg: 'Year must be at most 2024.',
      },
    },
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Director is required.' },
    },
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Duration must be an integer.' },
      min: {
        args: [1],
        msg: 'Duration must be a positive integer.',
      },
    },
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 5, // Default to 5 as in Zod
    validate: {
      min: {
        args: [0],
        msg: 'Rate must be at least 0.',
      },
      max: {
        args: [10],
        msg: 'Rate must be at most 10.',
      },
    },
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: { msg: 'Poster must be a valid URL.' },
    },
  },
  genre: {
    type: DataTypes.JSON, // Usamos JSON en lugar de JSONB
    allowNull: false,
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('Movie genre must be an array of enum Genre.');
        }
        const allowedGenres = [
          'Action',
          'Adventure',
          'Crime',
          'Comedy',
          'Drama',
          'Fantasy',
          'Horror',
          'Thriller',
          'Sci-Fi',
        ];
        for (const genre of value) {
          if (!allowedGenres.includes(genre)) {
            throw new Error(`Invalid genre: ${genre}. Allowed genres are: ${allowedGenres.join(', ')}`);
          }
        }
      },
    },
  },
});
