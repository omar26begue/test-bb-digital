import { CountProductQuery } from '@app/products/application/port/in/count-product.query';
import { CreateProductCommand } from '@app/products/application/port/in/create-product.command';
import { DeleteProductCommand } from '@app/products/application/port/in/delete-product.command';
import { ListFilterProductQuery } from '@app/products/application/port/in/list-filter-product.query';
import { ListProductQuery } from '@app/products/application/port/in/list-product.query';
import { UpdateProductCommand } from '@app/products/application/port/in/update-product.command';
import { CountProdutcUsecase } from '@app/products/application/usecase/count-produtc.usecase';
import { CreateProductUsecase } from '@app/products/application/usecase/create-product.usecase';
import { DeleteProductUsecase } from '@app/products/application/usecase/delete-product.usecase';
import { ListFilterProductUsecase } from '@app/products/application/usecase/list-filter-product-usecase.service';
import { ListProductUsecase } from '@app/products/application/usecase/list-product.usecase';
import { UpdateProductUsecase } from '@app/products/application/usecase/update-product.usecase';

export const UsesCases = [
    { provide: ListProductQuery, useClass: ListProductUsecase },
    { provide: CreateProductCommand, useClass: CreateProductUsecase },
    { provide: UpdateProductCommand, useClass: UpdateProductUsecase },
    { provide: DeleteProductCommand, useClass: DeleteProductUsecase },
    { provide: ListFilterProductQuery, useClass: ListFilterProductUsecase },
    { provide: CountProductQuery, useClass: CountProdutcUsecase },
];
