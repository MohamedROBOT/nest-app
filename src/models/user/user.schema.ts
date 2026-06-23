import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GENDER_ENUM, PROVIDER_ENUM } from '../../common';
import { HydratedDocument } from 'mongoose';

/*
hint about schema file location
The cat.schema file resides in a folder in the cats directory, 
where we also define the CatsModule. While you can store schema files wherever you prefer, 
we recommend storing them near their related domain objects, in the appropriate module directory.
*/

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true, discriminatorKey: 'role' })
export class User {
  role: string;
  @Prop({ type: String, required: true })
  username: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true })
  phoneNumber: string;
  @Prop({
    type: String,
    required: function (this: User) {
      return this.provider === PROVIDER_ENUM.SYSTEM;
    },
  })
  password: string;
  @Prop({ type: Number, enum: GENDER_ENUM, default: GENDER_ENUM.MALE })
  gender: GENDER_ENUM;
  @Prop({ type: Number, enum: PROVIDER_ENUM, default: PROVIDER_ENUM.SYSTEM })
  provider: PROVIDER_ENUM;
}

export const userSchema = SchemaFactory.createForClass(User);
