import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Admin, AdminDocument } from './admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AdminRepository extends AbstractRepository<AdminDocument> {
  constructor(
    @InjectModel(Admin.name) protected readonly Admin: Model<AdminDocument>,
  ) {
    super(Admin);
  }
}
