import { ResponseDTO } from '../dto/response.dto';

export function toResponseFactory<T>(data: any, message: string): ResponseDTO<any> {
    const response: ResponseDTO<T> = new ResponseDTO<T>();

    response.data = data;
    response.message = message;

    return response;
}
