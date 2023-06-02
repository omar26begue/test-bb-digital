import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO<T> {
    @ApiProperty()
    public data: T;

    @ApiProperty({ type: String })
    public message: string;
}
