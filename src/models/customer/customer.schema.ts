import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../user';
export type CustomerDocument = HydratedDocument<User & Customer>;

@Schema()
export class Customer {
  @Prop({ type: String })
  address: string;
}
export const customerSchema = SchemaFactory.createForClass(Customer);
