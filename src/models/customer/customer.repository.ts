import { AbstractRepository } from '../abstract.repository';
import { Customer, CustomerDocument } from './customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class CustomerRepository extends AbstractRepository<CustomerDocument> {
  constructor(
    @InjectModel(Customer.name)
    protected readonly Customer: Model<CustomerDocument>,
  ) {
    super(Customer);
  }
}
