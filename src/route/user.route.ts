import express from 'express';
const router = express.Router();
import * as userHandler from '../handler/user.handler';
import { authorizer } from '../common/middleware/authorizer';

// Route to get all users
router.get('/', authorizer, userHandler.get);

// Route to get user by ID
router.get('/:id', authorizer, userHandler.getById);

// Route to create a new user
router.post('/', userHandler.create);

//Route to login a user
router.post('/login', userHandler.login);

// Route to logout a user
router.post('/logout', authorizer, userHandler.logout);

export default router;
