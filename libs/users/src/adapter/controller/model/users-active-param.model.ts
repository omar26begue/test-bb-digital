import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersActiveParamModel {
    @IsEmail()
    @ApiProperty({ type: String, required: true, example: 'test@gmail.com' })
    public email: string;
}
