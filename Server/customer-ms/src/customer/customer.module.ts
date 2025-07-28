// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Customer } from './customer.entity';
// import { CustomerService } from './customer.service';
// import { CustomerController } from './customer.controller';
// import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Customer]), // ✅ THIS IS REQUIRED!
//   ],
//   providers: [CustomerService,RabbitMQService],
//   controllers: [CustomerController],
//   exports: [CustomerService],
// })
// export class CustomerModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity'; // 👤 Customer entity (DB model)
import { CustomerService } from './customer.service'; // 🧠 Business logic
import { CustomerController } from './customer.controller'; // 🎮 Handles incoming requests (REST/GraphQL)
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service'; // 📦 RabbitMQ publisher for sending messages

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]), // 🛠️ Registers Customer entity with TypeORM for DB access
  ],
  providers: [CustomerService, RabbitMQService], // ✅ Services used by this module
  controllers: [CustomerController], // 🎯 Controller to handle HTTP/GraphQL requests
  exports: [CustomerService], // 📤 Makes CustomerService available to other modules (if needed)
})
export class CustomerModule {} // 📦 Module definition
