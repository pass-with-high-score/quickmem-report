
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FreshdeskService } from './freshdesk.service';

@Controller('report')
export class FreshdeskController {
  constructor(private readonly freshdeskService: FreshdeskService) {}

  @Post()
  async reportIssue(
    @Body('reportType') reportType: string,
    @Body('reportedItemId') reportedItemId: number,
    @Body('reporterEmail') reporterEmail: string,
    @Body('description') description: string,
  ) {
    try {
      const result = await this.freshdeskService.createTicket(
        reportType,
        reportedItemId,
        reporterEmail,
        description,
      );
      return {
        message: 'Report sent successfully',
        ticket: result,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to send report to Freshdesk',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
