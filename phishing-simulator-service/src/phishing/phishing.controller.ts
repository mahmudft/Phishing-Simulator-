import { Controller, Post, Req, Get, Param, Body } from '@nestjs/common';
import {Request} from "express"
import { PhishingService } from './phishing.service';
import { Phisihing } from './schemas/phishing.schema';
import { CreatePhishingDto } from 'src/dto/phishing.dto';

@Controller('phishing')
export class PhishingController {
  constructor(private phisingService: PhishingService){}

    @Post('send')
    sendPishingEmail(@Body() createUserDto: CreatePhishingDto): Promise<Phisihing> {
      return  this.phisingService.create(createUserDto)
    }

    @Get('list/:id')
    getEmailList(@Param() params: any): Promise<Phisihing[]> {
      return  this.phisingService.getAll(params.id)
    }

    @Get('clickbait/:uuid')
    getClickCount(@Param('uuid') uuid: string): string {
      this.phisingService.increaseClickCount(uuid)
      return 'clicked!'
    }
}
