// import { Module } from '@nestjs/common';
// import { CustomerService } from './customer.service';
// import { CustomerController } from './customer.controller';

// @Module({
//   providers: [CustomerService],
//   controllers: [CustomerController]
// })
// export class CustomerModule {}

// customer.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]), // ✅ THIS IS REQUIRED!
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
