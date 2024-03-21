import express, { Express } from 'express';
import cors from 'cors';
import './lib/env';
import './routes/movies';
import movies from './routes/movies';
// import { logger } from './middleware/logger';
import morgan from 'morgan';
import { errorHandler } from './middleware/error';
import { getUserData } from './utils/generalUtils';
// This is the point of entry
const app: Express = express();

app.use(cors());
// Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.set('view engine', 'ejs');

app.get('/', (req, res) =>
	res.render('pages/index', { movies: getUserData() })
);
app.get('/add-movie', (req, res) => res.render('pages/add-movie'));

app.use('/api/v1/movies', movies);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
	);
});

export default app;
