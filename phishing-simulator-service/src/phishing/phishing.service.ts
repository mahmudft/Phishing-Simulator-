import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailStatus, Phisihing, PhisihingDocument } from './schemas/phishing.schema';

import { randomUUID } from 'crypto';
import { EmailService } from 'src/email/email.service';
import { CreatePhishingDto } from 'src/dto/phishing.dto';

const {PHISHING_LINK} = process.env

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(Phisihing.name) private phisihingModel: Model<Phisihing>,
    private emailService: EmailService,
  ) {}

  createPayload(attempt: Phisihing){
    const phishingLink = `${PHISHING_LINK}/phishing/clickbait/${attempt.linkID}`;
    let message = `
      ${attempt.body}
      <p>Please click <a target="_blank" href="${phishingLink}">here</a> to verify your account.</p>
      `;
      return message
  }
  async create(payload: CreatePhishingDto): Promise<Phisihing> {
    let attempt = new this.phisihingModel(payload);
    attempt.linkID = randomUUID();
    attempt.body = this.createPayload(attempt)
    let emailResponse = await this.emailService.sendEmail(attempt);
    if (emailResponse) {
      attempt.status = EmailStatus.SENT;
    }
    return attempt.save();
  }

  async getAll(userID: string): Promise<Array<Phisihing>> {
    let attempts = await this.phisihingModel.find({ userID });
    console.log(attempts.length);
    return attempts;
  }

  async increaseClickCount(linkID: string): Promise<Phisihing> {
    let attempt = await this.phisihingModel.findOne({ linkID });
    attempt.clickCount += 1;
    attempt.status = EmailStatus.OPENED;
    return attempt.save();
  }
}
