import { FastifyInstance } from 'fastify';
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import Logger from 'src/utils/logger';

export async function resolveFastifyRouters(fastify: FastifyInstance) {
  const root = __dirname;
  const modulesPath = await readdir(join(root, '..', '..', 'modules'));

  for (const module of modulesPath) {
    const filePath = join(root, '..', '..', 'modules', module, 'http');
    if (!existsSync(`${filePath}.ts`) && !existsSync(`${filePath}.js`)) {
      Logger.error(
        `Module ${module} not loaded. File http.ts or http.js not found`,
        resolveFastifyRouters.name,
      );
      continue;
    }

    import(filePath)
      .then((router) => {
        router.default(fastify);
        Logger.info(
          `Module ${module} loaded successfully`,
          resolveFastifyRouters.name,
        );
      })
      .catch((error) => {
        console.log(error);
        Logger.error(error, resolveFastifyRouters.name);
        process.exit(1);
      });
  }
}
