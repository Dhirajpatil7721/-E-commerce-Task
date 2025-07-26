// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Microservice for RabbitMQ
  
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'customer_queue',
      queueOptions: { durable: false },
    },
  });
  microservice.listen(); // Start RabbitMQ listener

  // REST API for testing or normal HTTP access
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  app.enableCors({
        origin: '*', // Allow requests only from this origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
        credentials: true, // Allow sending cookies/authentication tokens
      });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002); // REST API on port 3001
}
bootstrap();

