import { UpdateProductCommand } from '@app/products/application/port/in/update-product.command';
import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { ProductDomain } from '@app/products/domain/product.domain';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateProductUsecase implements UpdateProductCommand {
    public constructor(private readonly productRepository: ProductRepository) {}

    async execute(sku: string, product: ProductDomain): Promise<ProductDomain> {
        const productSku: ProductDomain = await this.productRepository.findSku(sku);
        if (productSku === null) {
            throw new NotFoundException(`El producto con SKU: ${sku} no existe en la base`);
        }

        const productUpdate: ProductDomain = await this.productRepository.update(sku, product);
        if (!productUpdate) {
            throw new NotFoundException(`El producto con SKU: ${sku} no existe en la base`);
        }

        return productUpdate;
    }
}
