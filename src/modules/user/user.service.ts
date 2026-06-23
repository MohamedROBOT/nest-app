import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserRepository } from '../../models';
import { SYS_MSG } from '../../common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getProfile(userId: Types.ObjectId) {
    const user = await this.userRepository.getOne({ _id: userId });
    if (!user) throw new NotFoundException(SYS_MSG.USER.NOT_FOUND);
    return user;
  }
}
