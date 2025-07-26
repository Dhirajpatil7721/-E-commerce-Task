import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  app.enableCors({
        origin: '*', // Allow requests only from this origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
        credentials: true, // Allow sending cookies/authentication tokens
      });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
