import { toResponseProduct, toResponseProducts } from '@app/products/adapter/controller/factory/product-response.factory';
import { ProductsFilterModel } from '@app/products/adapter/controller/model/products-filter.model';
import { ProductsParamModel } from '@app/products/adapter/controller/model/products-param.model';
import { ProductsRequestUpdateModel } from '@app/products/adapter/controller/model/products-request-update.model';
import { ProductsRequestModel } from '@app/products/adapter/controller/model/products-request.model';
import { ProductsResponseModel } from '@app/products/adapter/controller/model/products-response.model';
import { CountProductQuery } from '@app/products/application/port/in/count-product.query';
import { CreateProductCommand } from '@app/products/application/port/in/create-product.command';
import { DeleteProductCommand } from '@app/products/application/port/in/delete-product.command';
import { ListFilterProductQuery } from '@app/products/application/port/in/list-filter-product.query';
import { ListProductQuery } from '@app/products/application/port/in/list-product.query';
import { UpdateProductCommand } from '@app/products/application/port/in/update-product.command';
import { ROL } from '@app/users/domain/users.domain';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiDefaultResponse, ApiNoContentResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiOkResponseData } from '../../../../../src/commons/decorator/api-ok-response-data';
import { CanAccessRoles } from '../../../../../src/decorator/can-access-roles.decorator';
import { PagedResultDTO } from '../../../../../src/dto/paged-result.dto';
import { ResponseDTO } from '../../../../../src/dto/response.dto';
import { toResponseFactory } from '../../../../../src/factory/response.factory';
import { BearerTokenGuard } from '../../../../../src/guard/bearer-token-guard.service';

@Controller('products')
@ApiTags('Products')
export class ProductsControllerAdapter {
    public constructor(
        private readonly listProductQuery: ListProductQuery,
        private readonly createProductCommand: CreateProductCommand,
        private readonly updateProductCommand: UpdateProductCommand,
        private readonly deleteProductCommand: DeleteProductCommand,
        private readonly listFilterQuery: ListFilterProductQuery,
        private readonly countProductQuery: CountProductQuery,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @ApiOperation({ description: 'Listado de productos' })
    @ApiOkResponseData({ description: 'ok', type: ResponseDTO<ProductsResponseModel> })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async list(): Promise<ResponseDTO<ProductsResponseModel[]>> {
        const response = await this.listProductQuery.execute();
        return toResponseFactory(toResponseProducts(response), 'Listado de productos');
    }

    @Get('pagination')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @ApiOperation({ description: 'Listado de productos' })
    @ApiOkResponseData({ description: 'ok', type: ResponseDTO })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async listFindQuery(@Query() query: ProductsFilterModel): Promise<ResponseDTO<PagedResultDTO<ProductsResponseModel>>> {
        const response = await this.listFilterQuery.execute(query.page, toResponseProduct(query));
        return toResponseFactory(response, 'Listado de productos');
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @ApiOperation({ description: 'Listado de productos' })
    @ApiOkResponseData({ description: 'ok', type: ResponseDTO })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async count(@Query() query: ProductsFilterModel): Promise<ResponseDTO<number>> {
        const response = await this.countProductQuery.execute(query.page, toResponseProduct(query));
        return toResponseFactory(response, 'Cantidad de productos');
    }

    @Post('')
    @ApiBody({ type: ProductsRequestModel, required: true })
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @CanAccessRoles(ROL.ADMIN_ROL, ROL.EDIT_ROL)
    @ApiOperation({ description: 'Crea un nuevo producto' })
    @ApiCreatedResponse({ type: null })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async create(@Body() body: ProductsRequestModel): Promise<void> {
        await this.createProductCommand.execute(body.toDomain());
    }

    @Put(':sku')
    @ApiBody({ type: ProductsRequestUpdateModel, required: true })
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @CanAccessRoles(ROL.ADMIN_ROL, ROL.EDIT_ROL)
    @ApiOperation({ description: 'Actualiza la informaión de un producto' })
    @ApiCreatedResponse({ type: null })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async update(@Param() param: ProductsParamModel, @Body() body: ProductsRequestUpdateModel): Promise<ResponseDTO<ProductsResponseModel>> {
        const response = await this.updateProductCommand.execute(param.sku, body.toDomain());
        return toResponseFactory(toResponseProduct(response), 'Actualización de producto');
    }

    @Delete(':sku')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @CanAccessRoles(ROL.ADMIN_ROL, ROL.EDIT_ROL)
    @ApiOperation({ description: 'Elimina un producto' })
    @ApiNoContentResponse({ type: null })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async delete(@Param() param: ProductsParamModel): Promise<void> {
        await this.deleteProductCommand.execute(param.sku);
    }
}
