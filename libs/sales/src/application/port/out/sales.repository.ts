import { ProductDomain } from '@app/products/domain/product.domain';
import { SaleDomain } from '@app/sales/domain/sale.domain';

export abstract class SalesRepository {
    abstract salesProduct(skus: string[], products: ProductDomain[]): Promise<ProductDomain[]>;
    abstract saveSales(sales: SaleDomain[]): void;
    abstract getAll(): Promise<SaleDomain[]>;
}
