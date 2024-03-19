import { Router } from 'express';
import {
	createMovie,
	deleteMovie,
	getAllMovies,
	getMovie,
	updateMovie,
} from '../controllers/movies';

const router = Router();

router.route('/').get(getAllMovies).post(createMovie);
router.route('/:id').get(getMovie).put(updateMovie).delete(deleteMovie);

export default router;
