import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponseModel {
    @IsString()
    @ApiProperty({ type: String, required: true, example: '2c9d998c-3138-43f1-88bb-5bc174865dea' })
    public id: string;

    @IsString()
    @ApiProperty({ type: String, required: true, example: 'John Gonzales' })
    public name: string;

    @IsEmail()
    @ApiProperty({ type: String, required: true, example: 'test@gmail.com' })
    public email: string;
}
