import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional, IsString, IsUrl } from 'class-validator';

export class ProductsFilterModel {
    @IsString()
    @IsNumberString({})
    @ApiProperty({ type: Number, required: true, example: '1', description: 'Página' })
    public page: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, required: false, description: 'Nombre del producto' })
    public name: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @ApiProperty({ type: Number, required: false, minimum: 0.1 })
    public amount: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ type: Number, required: false, minimum: 1 })
    public count: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, required: false })
    public category: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, required: false })
    public tags: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, required: false })
    public description: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, required: false })
    public information: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ type: Number, required: false, minimum: 0, maximum: 5, description: 'Valoración del producto [0-5]' })
    public assessment: number;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ type: String, required: false })
    public sku: string;

    @IsOptional()
    @IsUrl()
    @ApiProperty({ type: String, required: false })
    public imagen: string;
}
