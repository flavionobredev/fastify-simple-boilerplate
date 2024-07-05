import { FastifyReply, FastifyRequest } from 'fastify';

type ControllerMethodResponse = {
  statusCode: number;
  body: any;
};

export const adaptFastifyRoute = (
  handler: (
    ...args: any[]
  ) => ControllerMethodResponse | Promise<ControllerMethodResponse>,
) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const data = {
      ...(req.body as object),
      ...(req.params as object),
      ...(req.query as object),
    };
    const httpResponse = await handler(data);
    res.status(httpResponse.statusCode).send(httpResponse.body);
  };
};
