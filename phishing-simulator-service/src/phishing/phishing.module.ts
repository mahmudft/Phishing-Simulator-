import { Module } from '@nestjs/common';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Phisihing, PhisihingSchema } from './schemas/phishing.schema';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Phisihing.name, schema: PhisihingSchema }]), EmailModule],
  controllers: [PhishingController],
  providers: [PhishingService]
})
export class PhishingModule {}
