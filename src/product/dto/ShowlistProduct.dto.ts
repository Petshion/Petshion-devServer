import { PickType } from '@nestjs/swagger';
import { Product } from '../schemas/product.schema';

export class ShowlistProductDto extends PickType(Product, [
  'title',
  'thumbnail_image',
]) {}
