import { ProductDomain } from '@app/products/domain/product.domain';

export abstract class CountProductQuery {
    abstract execute(page: number, payload: ProductDomain): Promise<number>;
}
