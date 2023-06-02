import { CreateProductCommand } from '@app/products/application/port/in/create-product.command';
import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { ProductDomain } from '@app/products/domain/product.domain';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUsecase implements CreateProductCommand {
    public constructor(private readonly productRepository: ProductRepository) {}

    async execute(payload: ProductDomain): Promise<void> {
        const product: ProductDomain = await this.productRepository.findSku(payload.sku);
        if (product) {
            throw new BadRequestException('Producto ya está registrado');
        }

        await this.productRepository.create(payload);
    }
}
