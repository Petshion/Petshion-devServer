import { PickType } from '@nestjs/swagger';
import { Product } from '../schemas/product.schema';

export class ProductListDto extends PickType(Product, [
  'title',
  'thumbnail_image',
  'isPawmark',
]) {}
