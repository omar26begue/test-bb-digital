import { ProductDomain } from '@app/products/domain/product.domain';
import { PagedResultDTO } from '../../../../../../src/dto/paged-result.dto';

export abstract class ListFilterProductQuery {
    abstract execute(page: number, payload: ProductDomain): Promise<PagedResultDTO<ProductDomain>>;
}
