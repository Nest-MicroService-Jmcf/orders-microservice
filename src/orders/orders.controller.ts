import { Controller, Logger, NotImplementedException, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
    

  }

  private readonly logger = new Logger('OrdersService');

  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  findAll() {
    return this.ordersService.findAll();
  }

@MessagePattern('findOneOrder')
async findOne(@Payload('id', ParseUUIDPipe) id: string) {
  //this.logger.log('findOne from MS controller', id);

  const result = await this.ordersService.findOne(id); // 👈 ejecutas la lógica
  console.log('MS returning order:', {result}); // 👈 lo imprimes

  return result; // 👈 lo devuelves como siempre
}


  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() updateOrderDto: UpdateOrderDto) {
    throw new NotImplementedException();
  }
}




