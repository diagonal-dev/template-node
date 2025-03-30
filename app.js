import express, { json } from 'express'; // require -> commonJS
// import { createMovieRouter } from './routes/movies.js';
import { createMovieRouter } from './routes/movieRoutes.js';
import { corsMiddleware } from './middlewares/cors.js';
import sequelize from './config/database.js';
import 'dotenv/config';

// después
export const createApp = async ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');

  app.use('/movies', createMovieRouter({ movieModel }));

  // Sincronizar la base de datos
  await sequelize
    .sync()
    .then(() => {
      console.log('Base de datos sincronizada.');
    })
    .catch((err) => {
      console.error('Error de sincronización: ', err);
    });

  const PORT = process.env.PORT ?? 3002;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
