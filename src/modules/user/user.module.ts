import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../../middlewares';
import {
  Admin,
  AdminRepository,
  adminSchema,
  Customer,
  CustomerRepository,
  customerSchema,
  User,
  UserRepository,
  userSchema,
} from '../../models';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = userSchema;
          //hooks can be added here
          return schema;
        },
        discriminators: [
          { name: Admin.name, schema: adminSchema },
          { name: Customer.name, schema: customerSchema },
        ],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, CustomerRepository, AdminRepository],
  exports: [CustomerRepository, AdminRepository, UserRepository],
})

//applying middleware for UserController all routes, we can exclude some routes
//middlewares are called before any route handler
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
