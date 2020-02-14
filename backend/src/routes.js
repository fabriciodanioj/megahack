import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import AddressController from './app/controllers/AddressController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(AuthMiddleware);

routes.delete('/users', UserController.delete);
routes.put('/users', UserController.update);

routes.post('/addresses', AddressController.store);
export default routes;
