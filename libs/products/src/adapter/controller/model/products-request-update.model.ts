import { ProductDomain } from '@app/products/domain/product.domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class ProductsRequestUpdateModel {
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
    @ApiProperty({ type: Number, required: true, minimum: 0, maximum: 5, description: 'Valoración del producto [0-5]' })
    public assessment: number;

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
        domain.imagen = this.imagen;

        return domain;
    }
}
