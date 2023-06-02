import { ProductDomain } from '@app/products/domain/product.domain';

export abstract class CreateProductCommand {
    abstract execute(payload: ProductDomain): Promise<void>;
}
