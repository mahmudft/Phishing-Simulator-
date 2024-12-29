import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { HydratedDocument } from 'mongoose';

export type PhisihingDocument = HydratedDocument<Phisihing>;


export enum EmailStatus {
  SENT,
  OPENED,
  FAILED
}
@Schema({ timestamps: true })
export class Phisihing extends Document {
  @Prop({ required: true })
  userID: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  recipient: string;

  @Prop({ type: String, enum: EmailStatus, default: EmailStatus.FAILED })
  status: EmailStatus;

  @Prop({ required: false, default: 0 })
  clickCount: number;

  @Prop({ required: false, default: 0, unique: true })
  linkID: string;
  
}


export const PhisihingSchema = SchemaFactory.createForClass(Phisihing);