export const errorHandler = (err: any, req: any, res: any, next: any) => {
	console.log(err.stack);

	res.status(err.statusCode || 500).json({
		success: false,
		error: err.message || 'Server Error',
	});
};
