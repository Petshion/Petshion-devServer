import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mongoose, SchemaType, SchemaTypes, Types } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

export type UserDocument = User & Document;

@Schema()
export class Basket {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product_id: Types.ObjectId;

  @Prop({ type: String })
  title: String;

  @Prop({ type: String })
  thumbnail_image: String;

  @Prop({ type: String })
  color: String;

  @Prop({ type: String })
  size: String;

  @Prop({ type: Number })
  count: Number;
}

@Schema()
export class Pawmark {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product_id: Types.ObjectId;

  @Prop({ type: String })
  title: String;

  @Prop({ type: String })
  thumbnail_image: String;
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

  @Prop()
  pawmark: [Pawmark];
}

export const UserSchema = SchemaFactory.createForClass(User);
