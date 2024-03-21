import data from '../config/db/data.json';
import { ErrorResponse } from '../utils/errorResponse';
import { v4 as uuidv4 } from 'uuid';
import { saveUserData, getUserData } from '../utils/generalUtils';

// @desc        Get all movies
// @route       GET /api/v1/movies
export const getAllMovies = (req: any, res: any, next: any) => {
	try {
		res.status(200).json({ success: true, msg: getUserData() });
	} catch (err) {
		next(err);
	}
};
// @desc        Get single movie
// @route       GET /api/v1/movies/:id
export const getMovie = (req: any, res: any, next: any) => {
	try {
		const movieId = req.params.id;
		const movies = data;
		const foundMovie = movies.find((movie) => movie.id === movieId);
		if (!foundMovie) {
			return next(
				new ErrorResponse(`Movie not found with id of ${movieId}`, 404)
			);
		}

		res.status(200).render('pages/edit-movie', {
			movie: foundMovie,
		});
	} catch (err) {
		next(new ErrorResponse(`Movie not found with id of ${req.params.id}`, 404));
	}
};
// @desc        Create new movie
// @route       POST /api/v1/movies
export const createMovie = (req: any, res: any, next: any) => {
	try {
		const id = uuidv4();
		const movies = data;
		const movieData = {
			id,
			title: req.body.movieTitle,
			year: parseInt(req.body.movieYear),
			category: req.body.movieCategory,
			rating: req.body.movieRating,
		};

		//check if the movie fields are missing
		if (
			movieData.title == null ||
			movieData.year == null ||
			movieData.category == null ||
			movieData.rating == null
		) {
			return res.status(401).send({ error: true, msg: 'Movie data missing' });
		}

		//check if the movie exists already
		const findExist = movies.find(
			(movie) => movie.title.toLowerCase() === movieData.title.toLowerCase()
		);
		if (findExist) {
			return res.status(409).send({ error: true, msg: 'Movie already exist' });
		}

		movies.push(movieData);
		saveUserData(movies);
		res.status(200).render('pages/index', {
			movies: getUserData(),
		});
	} catch (err) {
		next(err);
	}
};
// @desc        Update movie
// @route       PUT /api/v1/movies/:id
export const updateMovie = (req: any, res: any, next: any) => {
	try {
		// get id from params
		const id = req.params.id;
		const { movieTitle, movieYear, movieCategory, movieRating } = req.body;
		const movies = data;

		// get movie by id
		const foundMovie = movies.find((movie) => movie.id === id);

		const updatedMovies = movies.filter((movie) => movie.id !== foundMovie?.id);

		//push the updated data
		updatedMovies.push({
			id: id,
			title: movieTitle,
			year: movieYear,
			category: movieCategory,
			rating: movieRating,
		});
		//finally save it
		res.status(200).render('pages/index', {
			movies: getUserData(),
		});
		saveUserData(updatedMovies);
	} catch (err) {
		next(err);
	}
};
// @desc        delete movie
// @route       DELETE /api/v1/movies/:id
export const deleteMovie = (req: any, res: any, next: any) => {
	try {
		const id = req.params.id;
		const movies = data;

		// get movie by id
		const foundMovie = movies.find((movie) => movie.id === id);

		const updatedMovies = movies.filter((movie) => movie.id !== foundMovie?.id);
		saveUserData(updatedMovies);
		res.status(200).render('pages/index', {
			movies: updatedMovies,
		});
	} catch (err) {
		next(err);
	}
};
