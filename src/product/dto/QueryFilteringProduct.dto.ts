import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryFilteringProductDto {
  @ApiPropertyOptional({
    description: 'breed of an animal',
    required: true,
    nullable: false,
  })
  breed?: any;

  @ApiPropertyOptional({
    description: 'color of an animal',
    required: true,
    nullable: false,
  })
  color?: any;

  @ApiPropertyOptional({
    description: 'size of an animal',
    required: true,
    nullable: false,
  })
  size?: any;
}
