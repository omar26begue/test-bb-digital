import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { ProductDomain } from '@app/products/domain/product.domain';
import { ListProductSalesQuery } from '@app/sales/application/port/in/list-product-sales.query';
import { SalesRepository } from '@app/sales/application/port/out/sales.repository';
import { SaleDomain } from '@app/sales/domain/sale.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListProductSalesUsecase implements ListProductSalesQuery {
    public constructor(private readonly salesRepository: SalesRepository, private readonly productRepository: ProductRepository) {}

    async execute(): Promise<ProductDomain[]> {
        const sales: SaleDomain[] = await this.salesRepository.getAll();
        let skus = sales.map((value) => value.sku);
        skus = skus.filter((value, index) => skus.indexOf(value) === index);

        const productsAll = await this.productRepository.getAll();
        const products: ProductDomain[] = [];

        for (const item of productsAll) {
            products.push(...productsAll.filter((value) => value.sku === item.sku));
        }

        return products;
    }
}
