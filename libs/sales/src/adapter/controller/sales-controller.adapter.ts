import { ProductsResponseModel } from '@app/products/adapter/controller/model/products-response.model';
import { ListSalesProductModel } from '@app/sales/adapter/controller/model/list-sales-product.model';
import { SalesProductModel } from '@app/sales/adapter/controller/model/sales-product.model';
import { ListProductSalesQuery } from '@app/sales/application/port/in/list-product-sales.query';
import { ListProductZeroQuery } from '@app/sales/application/port/in/list-product-zero.query';
import { SalesProductCommand } from '@app/sales/application/port/in/sales-product.command';
import { TotalEarningQuery } from '@app/sales/application/port/in/total-earning.query';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiDefaultResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiOkResponseData } from '../../../../../src/commons/decorator/api-ok-response-data';
import { ResponseDTO } from '../../../../../src/dto/response.dto';
import { toResponseFactory } from '../../../../../src/factory/response.factory';
import { BearerTokenGuard } from '../../../../../src/guard/bearer-token-guard.service';

@Controller('sales')
@ApiTags('Sales')
export class SalesControllerAdapter {
    public constructor(
        private readonly salesProductCommand: SalesProductCommand,
        private readonly listProductZeroQuery: ListProductZeroQuery,
        private readonly totalEarningQuery: TotalEarningQuery,
        private readonly listProductSalesQuery: ListProductSalesQuery,
    ) {}

    @Post('product')
    @ApiBody({ type: SalesProductModel, required: true })
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @ApiOperation({ description: 'Realiza la venta de un listado de productos' })
    @ApiOkResponseData({ type: ResponseDTO, description: 'ok' })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async salesProduct(@Body() body: SalesProductModel): Promise<ResponseDTO<ProductsResponseModel>> {
        const response = await this.salesProductCommand.execute('user', body.products);
        return toResponseFactory(response, 'Ventas de productos');
    }

    @Get('list')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @ApiOperation({ description: 'Listado de articulos vendidos' })
    @ApiOkResponseData({ type: ResponseDTO, description: 'ok' })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async listSales(): Promise<ResponseDTO<ListSalesProductModel[]>> {
        const products = await this.listProductSalesQuery.execute();
        return toResponseFactory(products, 'Listado de productos vendidos');
    }

    @Get('list-product-zero')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @ApiOperation({ description: 'Listado de productos con stock en cero' })
    @ApiOkResponseData({ type: ResponseDTO, description: 'ok' })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async listProductZero(): Promise<ResponseDTO<ListSalesProductModel[]>> {
        const response = await this.listProductZeroQuery.execute();
        return toResponseFactory(response, 'Listado de productos en cero');
    }

    @Get('total-earnings')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(BearerTokenGuard)
    @ApiOperation({ description: 'Ganancias totales' })
    @ApiOkResponseData({ type: ResponseDTO, description: 'ok' })
    @ApiBadRequestResponse({ description: 'Bad request', type: ResponseDTO })
    @ApiUnauthorizedResponse({ description: 'User Unauthorized', type: ResponseDTO })
    @ApiDefaultResponse({ description: 'Response default', type: ResponseDTO })
    public async totalEarning(): Promise<ResponseDTO<number>> {
        const response = await this.totalEarningQuery.execute();
        return toResponseFactory(Math.round(100 * response) / 100, 'Ganancias totales');
    }
}
