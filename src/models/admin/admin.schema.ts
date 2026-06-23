import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../user';
export type AdminDocument = HydratedDocument<User & Admin>;
@Schema()
export class Admin {
  @Prop({ type: Boolean })
  isActive: boolean;
}

export const adminSchema = SchemaFactory.createForClass(Admin);
