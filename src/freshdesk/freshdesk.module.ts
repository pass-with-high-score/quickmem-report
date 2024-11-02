
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FreshdeskService } from './freshdesk.service';
import { FreshdeskController } from './freshdesk.controller';

@Module({
  imports: [HttpModule],
  controllers: [FreshdeskController],
  providers: [FreshdeskService],
})
export class FreshdeskModule {}
