import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDTO } from '../../dto/response.dto';

export const ApiOkResponseData = <TModel extends Type<unknown>>({ type, description }: { type: TModel; description: string }) =>
    applyDecorators(
        ApiExtraModels(ResponseDTO, type),
        ApiOkResponse({
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
