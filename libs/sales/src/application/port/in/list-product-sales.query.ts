import { ProductDomain } from '@app/products/domain/product.domain';

export abstract class ListProductSalesQuery {
    abstract execute(): Promise<ProductDomain[]>;
}
