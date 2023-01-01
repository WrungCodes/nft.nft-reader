import express, { Request, Response } from 'express';
import { Nft } from "../models/nft";

const router = express.Router();

router.get(
  '/api/nfts/',
  async (req: Request, res: Response) => {

    const page : number = req.query.page ? parseInt(req.query.page as string) : 1
    const limit : number = req.query.limit ? parseInt(req.query.limit as string) : 10

    // provider - blockchain
    // timestamp "begin - end"
    // contractAddress - contract
    // ownerAddress - owner
    // tokenId - token
    // name - collection

    let query : any = {}

    //TODO: add these checks to thier own middleware

    if(req.query.blockchain !== undefined)
    {
        query.provider = req.query.blockchain as string
    }

    if(req.query.collection !== undefined)
    {
        query.name = req.query.collection as string
    }

    if(req.query.tokenId !== undefined)
    {
        query.tokenId = req.query.tokenId as string
    }  

    if(req.query.contract !== undefined)
    {
        query.contractAddress = req.query.contract as string
    }  

    if(req.query.owner !== undefined)
    {
        query.ownerAddress = req.query.owner as string
    }  

    if(req.query.begin !== undefined)
    {
        query.timestamp = { $gte: req.query.begin, $lte: req.query.end ?? Date.now().toString() }
    }

    if(req.query.search !== undefined)
    {
        let regex = new RegExp( req.query.search as string, 'i');

        query['$or'] = [
            { provider: regex },
            { tokenId: regex},
            { contractAddress: regex},
            { ownerAddress: regex},
            { name: regex},
            { symbol: regex},
        ]
    }  

    let nfts = await Nft.find(query).limit(limit * 1).skip((page - 1) * limit).exec();

    const count = await Nft.count(query);

    res.status(200).send({
        nfts,
        page,
        totalPages: Math.max(Math.ceil(count / limit), 1)
    });
  }
);

export { router as getNftsRouter };