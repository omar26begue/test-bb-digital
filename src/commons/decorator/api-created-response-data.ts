import { applyDecorators, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ResponseDTO } from '../../dto/response.dto';

export const ApiCreatedResponseData = <TModel extends Type<unknown>>({ type, description }: { type: TModel; description: string }) =>
    applyDecorators(
        ApiExtraModels(ResponseDTO, type),
        ApiCreatedResponse({
            description,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDTO) },
                    {
                        properties: {
                            data: {
                                type: 'object',
                                $ref: getSchemaPath(type),
                            },
                        },
                    },
                ],
            },
        }),
    );
