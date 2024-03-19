import express, { Express } from 'express';
import cors from 'cors';
import './lib/env';
import './routes/movies';
import movies from './routes/movies';
// import { logger } from './middleware/logger';
import morgan from 'morgan';
// This is the point of entry
const app: Express = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.set('view engine', 'ejs');

app.use('/api/v1/movies', movies);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
	);
});

export default app;
