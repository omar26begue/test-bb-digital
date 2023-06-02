import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { ProductDomain } from '@app/products/domain/product.domain';
import { ListProductZeroQuery } from '@app/sales/application/port/in/list-product-zero.query';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProductZeroUsecase implements ListProductZeroQuery {
    public constructor(private readonly productRepository: ProductRepository) {}

    async execute(): Promise<ProductDomain[]> {
        const products = await this.productRepository.getAll();

        return products.filter((value) => value.count === 0);
    }
}
