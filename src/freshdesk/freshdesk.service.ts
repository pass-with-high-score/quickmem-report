
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FreshdeskService {
  private readonly freshdeskDomain = 'https://hadao1204.freshdesk.com';
  private readonly apiKey = 'mDedFX7R15J0ygwSQJOK';

  constructor(private readonly httpService: HttpService) {}

  async createTicket(reportType: string, reportedItemId: number, reporterEmail: string, description: string) {
    const url = `${this.freshdeskDomain}/api/v2/tickets`;
    const auth = Buffer.from(`${this.apiKey}:X`).toString('base64');

    const data = {
      email: reporterEmail,
      subject: `Report ${reportType} - ID: ${reportedItemId}`,
      description: description,
      status: 2,
      priority: 1,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to create ticket on Freshdesk',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
