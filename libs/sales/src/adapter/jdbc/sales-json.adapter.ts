import { ProductDomain } from '@app/products/domain/product.domain';
import { SalesRepository } from '@app/sales/application/port/out/sales.repository';
import { SaleDomain } from '@app/sales/domain/sale.domain';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';

const SALE_PRODUCTS = './public/sales.json';

@Injectable()
export class SalesJsonAdapter implements SalesRepository {
    _readFile(): any {
        try {
            return JSON.parse(fs.readFileSync(SALE_PRODUCTS, { encoding: 'utf-8' }));
        } catch (e) {
            throw new BadRequestException('Recurso no disponible');
        }
    }

    async salesProduct(skus: string[], products: ProductDomain[]): Promise<ProductDomain[]> {
        skus.forEach((sku) => {
            const index = products.findIndex((value) => value.sku === sku);
            products[index].count = products[index].count - 1;
        });

        return products;
    }

    saveSales(sales: SaleDomain[]): void {
        try {
            sales.push(...this._readFile());

            fs.writeFileSync(SALE_PRODUCTS, JSON.stringify(sales), { encoding: 'utf-8' });
        } catch (e) {
            throw new BadRequestException('Recurso no disponible');
        }
    }

    async getAll(): Promise<SaleDomain[]> {
        return this._readFile();
    }
}
