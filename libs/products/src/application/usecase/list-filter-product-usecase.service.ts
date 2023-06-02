import { ListFilterProductQuery } from '@app/products/application/port/in/list-filter-product.query';
import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { ProductDomain } from '@app/products/domain/product.domain';
import { Injectable } from '@nestjs/common';
import { PagedResultDTO } from '../../../../../src/dto/paged-result.dto';

@Injectable()
export class ListFilterProductUsecase implements ListFilterProductQuery {
    public constructor(private readonly productRepository: ProductRepository) {}

    async execute(page: number, payload: ProductDomain): Promise<PagedResultDTO<ProductDomain>> {
        return await this.productRepository.getPaginated(page, payload);
    }
}
