import { Product } from '../schemas/product.schema';

export class CreateProductDto extends Product {
  title: string;

  thumbnail_image: string;

  images: string[];

  brand_name: string;

  price: number;

  breed: string;

  content: string;

  size: string[];

  size_content: string[][];

  rate: number;

  color: string[];
}
