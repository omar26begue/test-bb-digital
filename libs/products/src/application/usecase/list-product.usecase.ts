import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { Injectable } from '@nestjs/common';
import { ListProductQuery } from '@app/products/application/port/in/list-product.query';
import { ProductDomain } from '@app/products/domain/product.domain';

@Injectable()
export class ListProductUsecase implements ListProductQuery {
    public constructor(private readonly productRepository: ProductRepository) {}

    async execute(): Promise<ProductDomain[]> {
        return await this.productRepository.getAll();
    }
}
