import UserController from '../controller/user.controller';
import { Request, Response, NextFunction } from 'express';

const userController = new UserController();

export const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userController.get();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const user = await userController.getById(id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { first_name, last_name, email, password } = req.body;
		const user: { _id: string; token: string } = await userController.create(first_name, last_name, email, password);
		res.status(201).json({ id: user._id, token: user.token, message: 'User created successfully' });
	} catch (error) {
		next(error);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const token = await userController.login(email, password);
		res.status(200).json({ token, message: 'User logged in successfully' });
	} catch (error) {
		next(error);
	}
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.body.loggedInUser;
		console.log('User:', user);
		await userController.logout(user);
		res.status(200).json({ message: 'User logged out successfully' });
	} catch (error) {
		next(error);
	}
};
