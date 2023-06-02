import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { ProductDomain } from '@app/products/domain/product.domain';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { PagedResultDTO } from '../../../../../src/dto/paged-result.dto';

const FILE_PRODUCTS = './public/products.json';

@Injectable()
export class ProductsJsonAdapter implements ProductRepository {
    _readFile(): any {
        try {
            return JSON.parse(fs.readFileSync(FILE_PRODUCTS, { encoding: 'utf-8' }));
        } catch (e) {
            throw new BadRequestException('Recurso no disponible');
        }
    }

    /**
     * Guardar en el fichero JSON todos los productos
     * @param products
     */
    saveAll(products: ProductDomain[]): void {
        try {
            fs.writeFileSync(FILE_PRODUCTS, JSON.stringify(products), { encoding: 'utf-8' });
        } catch (e) {
            throw new BadRequestException('Recurso no disponible');
        }
    }

    /**
     * Busca un producto dado su sku
     * @param sku identificador unico del producto
     */
    async findSku(sku: string): Promise<ProductDomain> {
        const fileProducts: [] = this._readFile();
        const products: ProductDomain[] = fileProducts.filter((value) => value['sku'] === sku);

        if (products.length > 0) {
            const productDomain: ProductDomain = new ProductDomain();
            productDomain.name = products[0].name;
            productDomain.amount = products[0].amount;
            productDomain.count = products[0].count;
            productDomain.category = products[0].category;
            productDomain.tags = products[0].tags;
            productDomain.description = products[0].description;
            productDomain.information = products[0].information;
            productDomain.assessment = products[0].assessment;
            productDomain.sku = products[0].sku;
            productDomain.imagen = products[0].imagen;

            return productDomain;
        }

        return null;
    }

    /**
     * Devuelve los productos almacenados en el JSON
     */
    async getAll(): Promise<ProductDomain[]> {
        return this._readFile();
    }

    /**
     * Devuelve los elementos paginados
     * @param page
     * @param filter
     */
    async getPaginated(page: number, filter: ProductDomain): Promise<PagedResultDTO<ProductDomain>> {
        let products: ProductDomain[] = await this.getAll();
        let countElement = products.length;

        if (filter.name || filter.amount || filter.count || filter.category || filter.tags || filter.description || filter.information || filter.assessment || filter.sku || filter.imagen) {
            products = products.filter(
                (value) =>
                    value.name === filter.name ||
                    value.amount === filter.amount ||
                    value.count === filter.count ||
                    value.category === filter.category ||
                    value.tags === filter.tags ||
                    value.description === filter.description ||
                    value.information === filter.information ||
                    value.assessment === filter.assessment ||
                    value.sku === filter.sku ||
                    value.imagen === filter.imagen,
            );

            countElement = products.length;
        }

        return {
            page: page,
            totalElements: countElement,
            limit: 10,
            elements: products.slice(page * 10 - 10, page * 10),
        } as PagedResultDTO<ProductDomain>;
    }

    /**
     * Crea un nuevo producto en el fichero JSON products.jsn
     * @param product
     */
    async create(product: ProductDomain): Promise<void> {
        const products: ProductDomain[] = await this.getAll();
        products.push(product);

        this.saveAll(products);
    }

    /**
     * Actualiza la informacion de un producto en el fichero JSON
     * @param sku identificador del producto
     * @param product Datos del producto
     */
    async update(sku: string, product: ProductDomain): Promise<ProductDomain> {
        const products: ProductDomain[] = await this.getAll();
        const index = products.findIndex((value) => value.sku === sku);

        if (index !== -1) {
            product.sku = sku;
            products[index] = product;

            this.saveAll(products);

            return products[index];
        }

        return null;
    }

    /**
     * Elimina un producto en el fichero JSON
     * @param sku identificador del producto
     */
    async delete(sku: string): Promise<void> {
        const products: ProductDomain[] = await this.getAll();
        const index = products.findIndex((value) => value.sku === sku);

        if (index !== -1) {
            products.splice(index, 1);
        }

        this.saveAll(products);
    }
}
