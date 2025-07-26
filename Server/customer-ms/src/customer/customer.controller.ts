// import { Controller } from '@nestjs/common';
// import { EventPattern, Payload } from '@nestjs/microservices';
// import { CustomerService } from './customer.service';

// // @Controller('customer')
// // export class CustomerController {}

// @Controller()
// export class CustomerController {
//   constructor(private service: CustomerService) {}

//   @EventPattern('order_created')
//   handleOrderCreated(@Payload() data: any) {
//     console.log('Received order_created event:', data);
//     // You can implement logic like order history or reward points
//   }
// }


import { Controller, Post, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) { }

  @Post()
  create(@Body() dto: CustomerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.service.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() dto: CustomerDto) {
  //   return this.service.update(id, dto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.service.remove(id);
  // }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CustomerDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
