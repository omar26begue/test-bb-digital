import { ProductDomain } from '@app/products/domain/product.domain';

export abstract class SalesProductCommand {
    abstract execute(userId: string, payload: string[]): Promise<ProductDomain[]>;
}
