import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/auth.guard';
import { AttemptsService } from './attempts.service';

@Controller('attempts')
@UseGuards(JwtAuthGuard)
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}

  @Get()
  getAllAttempts(@Request() req) {
    let attempts = this.attemptsService.getAttempListByUserId(req.user.userID)
    return attempts;
  }

  @Post()
  createAttempt(@Request() req) {
    let body = req.body
    body.userID = req.user.userID
    let attempts = this.attemptsService.createAttempt(body)
    return attempts;
  }
}