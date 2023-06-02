import { ProductDomain } from '@app/products/domain/product.domain';

export abstract class ListProductZeroQuery {
    abstract execute(): Promise<ProductDomain[]>;
}
