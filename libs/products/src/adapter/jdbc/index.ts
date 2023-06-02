import { ProductsJsonAdapter } from '@app/products/adapter/jdbc/products-json.adapter';
import { ProductRepository } from '@app/products/application/port/out/product.repository';

export const Repositories = [{ provide: ProductRepository, useClass: ProductsJsonAdapter }];
