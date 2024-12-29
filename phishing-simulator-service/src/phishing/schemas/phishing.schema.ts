import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { HydratedDocument } from 'mongoose';

export type PhisihingDocument = HydratedDocument<Phisihing>;

@Schema()
export class Phisihing extends Document {
  @Prop({ required: true })
  userID: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  recipient: string;

  @Prop({ required: false, default: false })
  status: boolean;

  @Prop({ required: false, default: 0 })
  clickCount: number;

  @Prop({ required: false, default: 0, unique: true })
  linkID: string;
  
}


export const PhisihingSchema = SchemaFactory.createForClass(Phisihing);