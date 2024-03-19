import data from '../config/db/data.json';

// @desc        Get all movies
// @route       GET /api/v1/movies
export const getAllMovies = (req: any, res: any, next: any) => {
	// console.log('req: ', req.query.sort);
	// res.status(200).json({ success: true, msg: 'Show all movies' });
	res.render('pages/index', {
		movies: data,
	});
};
// @desc        Get single movie
// @route       GET /api/v1/movies/:id
export const getMovie = (req: any, res: any, next: any) => {
	res.status(200).json({ success: true, msg: `Show movie ${req.params.id}` });
};
// @desc        Create new movie
// @route       POST /api/v1/movies
export const createMovie = (req: any, res: any, next: any) => {
	res.status(200).json({ success: true, msg: 'Create new movie' });
};
// @desc        Update movie
// @route       PUT /api/v1/movies/:id
export const updateMovie = (req: any, res: any, next: any) => {
	res.status(200).json({ success: true, msg: `Update movie ${req.params.id}` });
};
// @desc        delete movie
// @route       DELETE /api/v1/movies/:id
export const deleteMovie = (req: any, res: any, next: any) => {
	res.status(200).json({ success: true, msg: `Delete movie ${req.params.id}` });
};
