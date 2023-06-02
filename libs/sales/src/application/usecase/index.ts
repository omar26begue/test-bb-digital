import { ListProductSalesQuery } from '@app/sales/application/port/in/list-product-sales.query';
import { ListProductZeroQuery } from '@app/sales/application/port/in/list-product-zero.query';
import { SalesProductCommand } from '@app/sales/application/port/in/sales-product.command';
import { TotalEarningQuery } from '@app/sales/application/port/in/total-earning.query';
import { ListProductSalesUsecase } from '@app/sales/application/usecase/list-product-sales.usecase';
import { ListProductZeroUsecase } from '@app/sales/application/usecase/list-product-zero.usecase';
import { SalesProductUsecase } from '@app/sales/application/usecase/sales-product.usecase';
import { TotalEarningUsecase } from '@app/sales/application/usecase/total-earning.usecase';

export const UsesCases = [
    { provide: SalesProductCommand, useClass: SalesProductUsecase },
    { provide: ListProductZeroQuery, useClass: ListProductZeroUsecase },
    { provide: TotalEarningQuery, useClass: TotalEarningUsecase },
    { provide: ListProductSalesQuery, useClass: ListProductSalesUsecase },
];
