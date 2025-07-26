// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class CustomerService {}


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly repo: Repository<Customer>,
    ) { }

    create(dto: CustomerDto) {
        const customer = this.repo.create(dto);
        return this.repo.save(customer);
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    async update(id: number, dto: CustomerDto) {
        const customer = await this.repo.preload({ id, ...dto });
        if (!customer) throw new NotFoundException('Customer not found');
        return this.repo.save(customer);
    }

    async remove(id: number) {
        const customer = await this.repo.findOneBy({ id });
        if (!customer) throw new NotFoundException('Customer not found');
        return this.repo.remove(customer);
    }
}
