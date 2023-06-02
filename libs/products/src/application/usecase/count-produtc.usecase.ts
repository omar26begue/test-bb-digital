import { CountProductQuery } from '@app/products/application/port/in/count-product.query';
import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { ProductDomain } from '@app/products/domain/product.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountProdutcUsecase implements CountProductQuery {
    public constructor(private readonly productRepository: ProductRepository) {}

    async execute(page: number, payload: ProductDomain): Promise<number> {
        const response = await this.productRepository.getPaginated(page, payload);

        return response.totalElements;
    }
}
