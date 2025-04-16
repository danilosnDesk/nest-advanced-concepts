import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { HttpClientModule } from './http-client/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [AppController, CoffeesController],
  providers: [AppService],
})
export class AppModule {}
