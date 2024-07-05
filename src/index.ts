import { Application } from './config/app/app';

async function bootstrap() {
  const app = new Application();
  await app.listen(Number(process.env.PORT ?? 3333));
}

bootstrap();
