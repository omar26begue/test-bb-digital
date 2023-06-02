import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UsersResponseDomain } from '@app/users/domain/users-response.domain';

export class UsersLoginResponseModel {
    @IsString()
    @ApiProperty({ type: String, required: true, example: 'token' })
    public token: string;

    public of(domain: UsersResponseDomain): UsersLoginResponseModel {
        const model = new UsersLoginResponseModel();
        model.token = domain.token;

        return model;
    }
}
