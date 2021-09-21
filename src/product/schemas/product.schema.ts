import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  @ApiProperty({ description: 'Title' })
  title: string;

  @Prop({ type: String, required: true })
  @ApiProperty({ description: 'Thumbnail image url' })
  thumbnail_image: string;

  @Prop({ type: [String] })
  @ApiProperty({ description: 'Images url' })
  images: string[];

  @Prop({ type: String })
  @ApiProperty({ description: 'AR Image url' })
  AR_image: string;

  @Prop({ type: String })
  @ApiProperty({ description: 'Brand_name' })
  brand_name: string;

  @Prop({ type: Number })
  @ApiProperty({ description: 'Price' })
  price: number;

  @Prop({ type: String })
  @ApiProperty({ description: 'Breed' })
  kind: string;

  @Prop({ type: String })
  @ApiProperty({ description: 'Content' })
  content: string;

  @Prop({ type: [String] })
  @ApiProperty({ description: 'Size' })
  size: string[];

  @Prop({ type: [[String]] })
  @ApiProperty({ description: 'Size_content' })
  size_content: string[][];

  @Prop({ type: Number })
  @ApiProperty({ description: 'Rate' })
  rate: number;

  @Prop({ type: [String] })
  @ApiProperty({ description: 'Color' })
  color: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
