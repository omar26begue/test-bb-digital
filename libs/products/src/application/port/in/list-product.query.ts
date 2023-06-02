import { ProductDomain } from '@app/products/domain/product.domain';

export abstract class ListProductQuery {
    abstract execute(): Promise<ProductDomain[]>;
}
