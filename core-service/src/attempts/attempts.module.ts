import { Module } from '@nestjs/common';
import { AttemptsController } from './attempts.controller';
import { AttemptsService } from './attempts.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AttemptsController],
  providers: [AttemptsService],
  imports: [ HttpModule]
})
export class AttemptsModule {}
