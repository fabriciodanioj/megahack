import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(AuthMiddleware);

routes.delete('/user', UserController.delete);
routes.put('/user', UserController.update);

export default routes;
