import {
  Controller,
  Get,
  Param,
  Patch,
  RequestTimeoutException,
  UseInterceptors,
} from '@nestjs/common';
import { CircuitBreakerInterceptor } from 'src/common/interceptors/circuit-breaker/circuit-breaker.interceptor';
import { EntityExistsPipe } from 'src/common/pipes/entity-exists/entity-exists.pipe';
import { CoffeeEntity } from './coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor() {}
  @UseInterceptors(CircuitBreakerInterceptor)
  @Get()
  getAllCoffees() {
    console.log('Fetching all coffees...');
    throw new RequestTimeoutException('Request timed out!');
    // Simulate a delay to mimic a slow response
    return [
      {
        id: 1,
        name: 'Coffee 1',
      },
      {
        id: 2,
        name: 'Coffee 2',
      },
    ];
  }

  @Patch(':id')
  patchCoffee(@Param('id', EntityExistsPipe(CoffeeEntity)) id: string) {
    return id;
  }
}
