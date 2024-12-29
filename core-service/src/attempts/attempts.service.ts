// attempts.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AttempsDto } from './dto/attemps.dto';

@Injectable()
export class AttemptsService {
  constructor(private readonly httpService: HttpService) {}

  private URL: string = process.env.SIMULATOR_URL

  async createAttempt(payload: AttempsDto) {

    const response = await this.httpService.axiosRef.post(
        `${this.URL}/phishing/send`,
      payload
    );

    return response.data;
  }

  async getAttempListByUserId(userID: string) {

    const response = await this.httpService.axiosRef.get(
      `${this.URL}/phishing/list/${userID}`
    );

    return response.data;
  }
}