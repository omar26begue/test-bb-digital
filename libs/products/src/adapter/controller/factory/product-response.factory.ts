import { ProductsResponseModel } from '@app/products/adapter/controller/model/products-response.model';
import { ProductDomain } from '@app/products/domain/product.domain';

export function toResponseProduct(product: ProductDomain): ProductsResponseModel {
    const response: ProductsResponseModel = new ProductsResponseModel();
    response.name = product.name;
    response.amount = product.amount;
    response.count = product.count;
    response.category = product.category;
    response.tags = product.tags;
    response.description = product.description;
    response.information = product.information;
    response.assessment = product.assessment;
    response.sku = product.sku;
    response.imagen = product.imagen;

    return response;
}

export function toResponseProducts(products: ProductDomain[]): ProductsResponseModel[] {
    const response: ProductsResponseModel[] = [];

    products.forEach((value) => {
        response.push({
            name: value.name,
            amount: value.amount,
            count: value.count,
            category: value.category,
            tags: value.tags,
            description: value.description,
            information: value.information,
            assessment: value.assessment,
            sku: value.sku,
            imagen: value.imagen,
        } as ProductsResponseModel);
    });

    return response;
}
