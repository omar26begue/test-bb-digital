import { DeleteProductCommand } from '@app/products/application/port/in/delete-product.command';
import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { ProductDomain } from '@app/products/domain/product.domain';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteProductUsecase implements DeleteProductCommand {
    public constructor(private readonly productRepository: ProductRepository) {}

    async execute(sku: string): Promise<void> {
        const product: ProductDomain = await this.productRepository.findSku(sku);
        if (!product) {
            throw new NotFoundException(`El producto con SKU: ${sku} no existe en la base`);
        }

        await this.productRepository.delete(sku);
    }
}
