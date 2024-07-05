import Fastify, { FastifyInstance } from 'fastify';
import Logger from '../../utils/logger';
import { resolveFastifyRouters } from './http-routes-resolver';

export class Application {
  private readonly instance: FastifyInstance;
  private readonly logger = new Logger(Application.name);

  constructor() {
    this.instance = Fastify({
      bodyLimit: 1024 * 1024 * 1,
      requestTimeout: 1000 * 10, // 10 seconds
      keepAliveTimeout: 1000 * 60 * 1, // 1 minute
    });
  }

  private async registerRoutes() {
    this.instance.get('/', (req, res) => {
      res.send({ message: 'ok' });
    });
    await resolveFastifyRouters(this.instance);
  }

  public async listen(port: number, callback?: (address?: string) => void) {
    await this.registerRoutes();
    this.instance
      .listen({
        port,
        host: '0.0.0.0',
      })
      .then((address) => {
        if (callback) callback(address);
        this.logger.info(`Application successfully started (${address})`);
      });
  }
}
