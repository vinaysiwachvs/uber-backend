import { NextFunction, Request, Response } from 'express';

export const defaultErrorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
	// TODO: Log the error using the common handler

	// next(error);
	console.log('Error in defaultErrorHandler', error);
	res.status(500).json({ message: error.message });
};
