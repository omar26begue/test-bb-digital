import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { ProductDomain } from '@app/products/domain/product.domain';
import { SalesProductCommand } from '@app/sales/application/port/in/sales-product.command';
import { SalesRepository } from '@app/sales/application/port/out/sales.repository';
import { SaleDomain } from '@app/sales/domain/sale.domain';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SalesProductUsecase implements SalesProductCommand {
    public constructor(private readonly productRepository: ProductRepository, private readonly salesRepository: SalesRepository) {}

    /**
     * En este metodo no logre entender mucho el contexto de lo que se pedia, entonces lo que desarrolle
     * es un arreglo de productos y en base a esos realice la validacion
     * @param userId
     * @param payload
     */
    async execute(userId: string, payload: string[]): Promise<ProductDomain[]> {
        const resultProduct = payload.filter((value, index) => payload.indexOf(value) === index);

        if (resultProduct.length !== payload.length) {
            throw new BadRequestException('No se puede eliminar 2 vecces el mismo producto');
        }

        const products = await this.productRepository.getAll();
        const productSales: SaleDomain[] = [];

        payload.forEach((item) => {
            const tempProduct = products.filter((value) => value.sku === item);

            if (tempProduct.length === 0) {
                throw new NotFoundException(`El producto con código ${item} no existe`);
            }

            if (tempProduct[0].count === 0) {
                throw new BadRequestException(`El producto ${item} no tiene stock`);
            }

            productSales.push({ sku: item, user: userId, amount: tempProduct[0].amount, date: new Date() } as SaleDomain);
        });

        const response = await this.salesRepository.salesProduct(payload, products);
        this.productRepository.saveAll(response);
        this.salesRepository.saveSales(productSales);

        const productSku: ProductDomain[] = [];
        payload.forEach((value) => {
            productSku.push(...response.filter((v) => v.sku === value));
        });

        return productSku;
    }
}
