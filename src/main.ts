import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const apiName = configService.get<string>('api.name');
    const apiDescription = configService.get<string>('api.description');
    const port = configService.get<number>('port');

    const config = new DocumentBuilder()
        .setTitle(apiName)
        .setDescription(apiDescription)
        .setVersion('1.0.0')
        .setContact('BB Digital', 'http://prueba.com', 'omar26begue@gmail.com')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./docs/swagger-spec.json', JSON.stringify(document));
    SwaggerModule.setup('', app, document);

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    app.enableCors();
    await app.listen(port);

    console.log(`RUN APP http://localhost:${port}`);
}
bootstrap();
