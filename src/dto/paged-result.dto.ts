import { ApiProperty } from '@nestjs/swagger';

export class PagedResultDTO<T> {
    @ApiProperty()
    public elements: T[];

    @ApiProperty({ type: Number, required: true, example: '100', description: 'Total de elementos' })
    public totalElements: number;

    @ApiProperty({ type: Number, required: true, example: '10', description: 'Limite de elementos para mostrar' })
    public limit: number;

    @ApiProperty({ type: Number, required: true, example: '1', description: 'Pagina que se esta mostrando' })
    public page: number;
}
