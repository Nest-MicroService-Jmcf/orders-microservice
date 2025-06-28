import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { isUUID } from 'class-validator';
import { isUndefined } from 'util';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('OrdersService connected to the database');
  } 
  
  create(createOrderDto: CreateOrderDto) {
  return this.order.create({
    data: createOrderDto,
  });
}

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    if (!id || !isUUID(id) || id 
    === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['The id must be a valid UUID'],
        error: 'Bad Request',
      });
    }
    
    const order = await this.order.findUnique({
      where: { id }, // Prisma entiende que `id` es UUID si tu modelo lo define así
    });

    if (!order) {
      this.logger.log(`Order with id ${id} not found`);
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: [`Order with id ${id} not found`],
        error: 'Not Found',
      });
    }

    return order;
  }

  changeOrderStatus(updateOrderDto: UpdateOrderDto) {
   
  }
}
