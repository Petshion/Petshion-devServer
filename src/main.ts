import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CreateProductDto } from './product/dto/CreateProduct.dto';
import { QueryFilteringProductDto } from './product/dto/QueryFilteringProduct.dto';
import { FilteringProductDto } from './product/dto/FilteringProduct.dto';
import { FindProductDto } from './product/dto/FindProduct.dto';
import { ShowlistProductDto } from './product/dto/ShowlistProduct.dto';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Petshion API')
    .setDescription('Petshion API with Nest.Js')
    .setVersion('1.0')
    .addTag('Product', 'Product API')
    .addTag('User', 'User API')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT ' })
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      CreateProductDto,
      FilteringProductDto,
      FindProductDto,
      ShowlistProductDto,
      QueryFilteringProductDto,
    ],
  });
  SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(8080);
}
bootstrap();
