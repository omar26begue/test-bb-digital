import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseModel {
    @IsString()
    @ApiProperty({ type: String, required: true, example: 'a6bf8673-eb8e-4f1b-94d1-4f949cbba187' })
    public id: string;

    @IsString()
    @ApiProperty({ type: String, required: true, example: 'token' })
    public token: string;
}
