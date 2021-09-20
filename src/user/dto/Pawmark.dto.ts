import { ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Pawmark } from '../schemas/user.schema';

export class PawmarkListDto extends Pawmark {
  @ApiPropertyOptional({
    description: 'Oid of Product',
    type: String,
    required: true,
    nullable: false,
  })
  product_id: Types.ObjectId;
}
