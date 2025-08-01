import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule ,
    {transport : Transport.TCP , 
      options:{
       port :envs.port
      }
    }
  );
   const logger = new Logger('ORDERS_MICROSERVICE'); ;
 
  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist:true ,
        forbidNonWhitelisted:true ,
        transform: true,}
    ) , 
  );
 
  await app.listen();
  logger.log(`Orders MicroService running on port ${envs.port}`)
}
bootstrap();
