import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mongoose, SchemaType, SchemaTypes, Types } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

export type UserDocument = User & Document;

@Schema()
export class Basket {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  product_id: Types.ObjectId;

  @Prop({ type: String })
  selected_color: String;

  @Prop({ type: String })
  selected_size: String;

  @Prop({ type: Number })
  selected_count: Number;
}

@Schema()
export class User {
  @Prop({ type: String })
  googleId: String;

  @Prop({ type: String })
  username: String;

  @Prop({ type: String })
  image: String;

  @Prop()
  basket: [Basket];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  Pawmark: [Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);
