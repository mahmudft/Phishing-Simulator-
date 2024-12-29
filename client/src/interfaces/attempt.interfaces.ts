export interface AttemptInterface {
    userID: string;
    body: string;
    recipient: string;
    status: boolean;
    clickCount: number;
    linkID: string;
  }

  export interface FormData {
    recipient: string;
    body: string;
  }