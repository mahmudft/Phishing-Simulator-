
export enum EmailStatus {
  SENT,
  OPENED,
  FAILED
}

export interface AttemptInterface {
    userID: string;
    body: string;
    recipient: string;
    status: EmailStatus;
    clickCount: number;
    linkID: string;
  }

  export interface FormData {
    recipient: string;
    body: string;
  }