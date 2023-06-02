import { ProductDomain } from '@app/products/domain/product.domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString, IsUrl } from 'class-validator';

export class ProductsRequestModel {
    @IsString()
    @ApiProperty({ type: String, required: true, example: 'Producto de ejemplo', description: 'Nombre del producto' })
    public name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @ApiProperty({ type: Number, required: true, example: '12345.12', minimum: 0.1 })
    public amount: number;

    @IsNumber()
    @ApiProperty({ type: Number, required: true, example: '123', minimum: 1 })
    public count: number;

    @IsString()
    @ApiProperty({ type: String, required: true, example: 'Prueba' })
    public category: string;

    @IsString()
    @ApiProperty({ type: String, required: true, example: 'Ventas' })
    public tags: string;

    @IsString()
    @ApiProperty({ type: String, required: true, example: 'Ejemplo de descripción producto' })
    public description: string;

    @IsString()
    @ApiProperty({ type: String, required: true, example: 'Información del producto' })
    public information: string;

    @IsNumber()
    @ApiProperty({ type: Number, required: true, example: '4', minimum: 0, maximum: 5, description: 'Valoración del producto [0-5]' })
    public assessment: number;

    @IsNumberString()
    @ApiProperty({ type: String, required: true, example: '001' })
    public sku: string;

    @IsUrl()
    @ApiProperty({ type: String, required: true, example: 'http://www.example.com/' })
    public imagen: string;

    public toDomain(): ProductDomain {
        const domain: ProductDomain = new ProductDomain();
        domain.name = this.name;
        domain.amount = this.amount;
        domain.count = this.count;
        domain.category = this.category;
        domain.tags = this.tags;
        domain.description = this.description;
        domain.information = this.information;
        domain.assessment = this.assessment;
        domain.sku = this.sku;
        domain.imagen = this.imagen;

        return domain;
    }
}
