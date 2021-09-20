import { ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Basket } from '../schemas/user.schema';
export class BasketListDto extends Basket {
  @ApiPropertyOptional({
    description: 'Oid of Product',
    type: Types.ObjectId,
    required: true,
    nullable: false,
  })
  product_id: Types.ObjectId;

  @ApiPropertyOptional({
    description: 'Color of Product',
    type: String,
    required: false,
  })
  selected_color: string;

  @ApiPropertyOptional({
    description: 'Size of Product',
    type: String,
    required: false,
  })
  selected_size: string;

  @ApiPropertyOptional({
    description: 'Count of Product',
    type: Number,
    required: false,
  })
  selected_count: number;
}
