import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) protected readonly User: Model<UserDocument>,
  ) {
    super(User);
  }
}
