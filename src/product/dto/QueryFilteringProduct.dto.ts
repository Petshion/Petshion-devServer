import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryFilteringProductDto {
  @ApiPropertyOptional({
    description: 'breed of an animal',
    type: String,
    example: 'cat',
    required: true,
    nullable: false,
  })
  breed?: string;

  @ApiPropertyOptional({
    description: 'color of an animal',
    type: [String],
    example: ['black'],
    required: true,
    nullable: false,
  })
  color?: string[];

  @ApiPropertyOptional({
    description: 'size of an animal',
    type: [String],
    example: ['XL'],
    required: true,
    nullable: false,
  })
  size?: string[];
}
