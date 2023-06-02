import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiDefaultResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersRequestModel } from '@app/users/adapter/controller/model/users-request.model';
import { CreateUserCommand } from '@app/users/application/port/in/create-user-command';
import { toResponseUsers } from '@app/users/adapter/controller/factory/users-response.factory';
import { UsersResponseModel } from '@app/users/adapter/controller/model/users-response.model';
import { ResponseDTO } from '../../../../../src/dto/response.dto';
import { ApiCreatedResponseData } from '../../../../../src/commons/decorator/api-created-response-data';
import { toResponseFactory } from '../../../../../src/factory/response.factory';
import { UsersActiveParamModel } from '@app/users/adapter/controller/model/users-active-param.model';
import { ActiveUserCommand } from '@app/users/application/port/in/active-user-command';

@Controller('users')
@ApiTags('Users')
export class UsersControllerAdapter {
    public constructor(private readonly createUserCommand: CreateUserCommand, private readonly activeUserCommand: ActiveUserCommand) {}

    @Post('')
    @ApiBody({ type: UsersRequestModel, required: true })
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ description: 'Creacion de usuarios' })
    @ApiCreatedResponseData({ description: 'ok', type: ResponseDTO })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async create(@Body() body: UsersRequestModel): Promise<ResponseDTO<UsersResponseModel>> {
        const response = await this.createUserCommand.execute(body.toDomain());
        return toResponseFactory(toResponseUsers(response), 'Usuario creado');
    }

    @Post(':email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ description: 'Activacion de usuario' })
    @ApiCreatedResponseData({ description: 'ok', type: ResponseDTO })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiNotFoundResponse({ description: 'Not found', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async active(@Param() param: UsersActiveParamModel): Promise<ResponseDTO<UsersResponseModel>> {
        const response = await this.activeUserCommand.execute(param);
        return toResponseFactory(toResponseUsers(response), 'Usuario activado');
    }
}
