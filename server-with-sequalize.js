import { createApp } from './app.js';

import { MovieModel } from './models/sequalize/movie.js';

await createApp({ movieModel: MovieModel });
