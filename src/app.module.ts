import { Module } from '@nestjs/common';
import { FreshdeskModule } from './freshdesk/freshdesk.module';

@Module({
  imports: [FreshdeskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}