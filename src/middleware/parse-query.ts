import { NextFunction, Request, Response } from 'express';

const parseQueryMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;
    let query: any = {};
  
    if (req.query.blockchain) query.provider = req.query.blockchain;
    if (req.query.collection) query.name = req.query.collection;
    if (req.query.tokenId) query.tokenId = req.query.tokenId;
    if (req.query.contract) query.contractAddress = req.query.contract;
    if (req.query.owner) query.ownerAddress = req.query.owner;
    if (req.query.begin) query.timestamp = { $gte: req.query.begin, $lte: req.query.end || new Date().toISOString() };
  
    if (req.query.search) {
      const regex = new RegExp(req.query.search as string, 'i');
      query['$or'] = ['provider', 'tokenId', 'contractAddress', 'ownerAddress', 'name', 'symbol'].map(field => ({ [field]: regex }));
    }
  
    req.queryData = { query, page, limit };
    next();
  };

export { parseQueryMiddleware };
