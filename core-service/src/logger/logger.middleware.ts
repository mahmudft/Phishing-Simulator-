import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, url, body, baseUrl } = req;
    this.logger.log(`${method} ${baseUrl}  ${JSON.stringify(body)}`);  // Log the HTTP method and URL
    next();
  }
}
