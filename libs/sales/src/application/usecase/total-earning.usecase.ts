import { TotalEarningQuery } from '@app/sales/application/port/in/total-earning.query';
import { SalesRepository } from '@app/sales/application/port/out/sales.repository';
import { SaleDomain } from '@app/sales/domain/sale.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TotalEarningUsecase implements TotalEarningQuery {
    public constructor(private readonly salesRepository: SalesRepository) {}

    async execute(): Promise<number> {
        const sales: SaleDomain[] = await this.salesRepository.getAll();

        const total: number = sales.reduce((a, b) => a + b.amount, 0);

        return total;
    }
}
