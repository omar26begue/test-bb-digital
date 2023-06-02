import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductsResponseModel {
    @IsString()
    @ApiProperty({ type: String, required: true, example: 'example product' })
    public name: string;
    public amount: number;
    public count: number;
    public category: string;
    public tags: string;
    public description: string;
    public information: string;
    public assessment: number;
    public sku: string;
    public imagen: string;
}
