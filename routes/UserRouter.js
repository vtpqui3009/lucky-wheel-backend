import express from 'express';

import {deleteUser, index, indexById, isAuth, login, signup} from '../controller/UserController.js';

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/', index);

router.delete('/:id', deleteUser);

router.get('/:id', indexById);

router.get('/private', isAuth);


export {router as UserRouter};
