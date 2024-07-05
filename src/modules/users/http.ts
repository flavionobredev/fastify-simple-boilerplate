import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { adaptFastifyRoute } from 'src/config/adapters/http.adapter';

const userController = new UserController(new UserService());

export const routes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  next: Function,
) => {
  fastify.post(
    '/',
    adaptFastifyRoute(userController.createOne.bind(userController)),
  );

  next();
};

export default (fastify: FastifyInstance) =>
  fastify.register(routes, { prefix: '/users' });
