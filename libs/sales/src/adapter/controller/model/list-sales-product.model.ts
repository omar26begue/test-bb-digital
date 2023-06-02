import { ApiProperty } from '@nestjs/swagger';

export class ListSalesProductModel {
    @ApiProperty({ type: String, required: true, example: 'Nombre del usuario' })
    public name: string;
}
