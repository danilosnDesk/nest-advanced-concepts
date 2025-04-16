import {
  Controller,
  Get,
  RequestTimeoutException,
  UseInterceptors,
} from '@nestjs/common';
import { CircuitBreakerInterceptor } from 'src/common/interceptors/circuit-breaker/circuit-breaker.interceptor';

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
}
