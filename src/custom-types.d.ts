import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    queryData?: {
      query: any;
      page: number;
      limit: number;
    };
  }
}