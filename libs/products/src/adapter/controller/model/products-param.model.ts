import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductsParamModel {
    @IsString()
    @ApiProperty({ type: String, required: true, example: '001' })
    public sku: string;
}
