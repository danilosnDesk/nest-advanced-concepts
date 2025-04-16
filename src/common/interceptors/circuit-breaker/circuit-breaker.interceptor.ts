/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CircuitBreaker } from '../circuit-breaker';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private readonly circuitBreakerhandler = new WeakMap<
    Function,
    CircuitBreaker
  >();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const methodRe = context.getHandler();

    let circuitBreaker: CircuitBreaker;
    if (this.circuitBreakerhandler.has(methodRe)) {
      circuitBreaker = this.circuitBreakerhandler.get(methodRe)!;
    } else {
      circuitBreaker = new CircuitBreaker();
      this.circuitBreakerhandler.set(methodRe, circuitBreaker);
    }

    return circuitBreaker.exec(next);
  }
}
