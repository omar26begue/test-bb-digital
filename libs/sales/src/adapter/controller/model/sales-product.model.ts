import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SalesProductModel {
    @IsString({ each: true })
    @ApiProperty({ type: Array, required: true, example: '["001","002"]', description: 'Listado de productos' })
    public products: string[];
}
