import { ProductDomain } from '@app/products/domain/product.domain';

export abstract class UpdateProductCommand {
    abstract execute(sku: string, product: ProductDomain): Promise<ProductDomain>;
}
