import { ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Basket } from '../schemas/user.schema';
export class BasketListDto extends Basket {
  @ApiPropertyOptional({
    description: 'Oid of Product',
    type: String,
    required: true,
    nullable: false,
  })
  product_id: Types.ObjectId;

  @ApiPropertyOptional({
    description: 'Color of Product',
    type: String,
    required: false,
  })
  color: string;

  @ApiPropertyOptional({
    description: 'Size of Product',
    type: String,
    required: false,
  })
  size: string;

  @ApiPropertyOptional({
    description: 'Count of Product',
    type: Number,
    required: false,
  })
  count: number;
}
export class EditBasketListDto extends Basket {
  @ApiPropertyOptional({
    description: 'Oid of Basket',
    type: String,
    required: true,
    nullable: false,
  })
  _id: Types.ObjectId;
}
