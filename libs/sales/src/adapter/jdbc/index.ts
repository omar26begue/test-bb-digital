import { SalesJsonAdapter } from '@app/sales/adapter/jdbc/sales-json.adapter';
import { SalesRepository } from '@app/sales/application/port/out/sales.repository';

export const Repositories = [{ provide: SalesRepository, useClass: SalesJsonAdapter }];
