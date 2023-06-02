import { toResponseLogin } from '@app/auth/adapter/controller/factory/login-response.factory';
import { AuthRequestModel } from '@app/auth/adapter/controller/model/auth-request.model';
import { AuthResponseModel } from '@app/auth/adapter/controller/model/auth-response.model';
import { LoginCommand } from '@app/auth/application/port/in/login-command';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseData } from '../../../../../src/commons/decorator/api-ok-response-data';
import { ResponseDTO } from '../../../../../src/dto/response.dto';
import { toResponseFactory } from '../../../../../src/factory/response.factory';

@Controller('auth')
@ApiTags('Auth')
export class AuthControllerAdapter {
    public constructor(private readonly loginCommand: LoginCommand) {}

    @Post('/login')
    @ApiBody({ type: AuthRequestModel, required: true })
    @ApiOkResponseData({ description: 'ok', type: ResponseDTO<AuthResponseModel> })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async login(@Body() body: AuthRequestModel): Promise<ResponseDTO<AuthResponseModel>> {
        const response = await this.loginCommand.execute(body.toDomain());
        return toResponseFactory(toResponseLogin(response), 'Autentificacion de usuario');
    }
}
