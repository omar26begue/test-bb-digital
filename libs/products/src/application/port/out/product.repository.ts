import { ProductDomain } from '@app/products/domain/product.domain';
import { PagedResultDTO } from '../../../../../../src/dto/paged-result.dto';

export abstract class ProductRepository {
    abstract findSku(sku: string): Promise<ProductDomain>;
    abstract getAll(): Promise<ProductDomain[]>;
    abstract getPaginated(page: number, filter: ProductDomain): Promise<PagedResultDTO<ProductDomain>>;
    abstract create(product: ProductDomain): Promise<void>;
    abstract update(sku: string, product: ProductDomain): Promise<ProductDomain>;
    abstract delete(sku: string): Promise<void>;
    abstract saveAll(products: ProductDomain[]): void;
}
