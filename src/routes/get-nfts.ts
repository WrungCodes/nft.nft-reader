import express, { Request, Response } from "express";
import { parseQueryMiddleware } from "../middleware/parse-query";
import { Nft } from "../models/nft";

const router = express.Router();

router.get(
  "/api/nfts/",
  parseQueryMiddleware,
  async (req: Request, res: Response) => {
    // Ensure queryData exists before proceeding
    if (!req.queryData) {
      return res.status(400).send({ error: "Missing query data" });
    }

    const { query, page, limit } = req.queryData;

    try {
      const nfts = await Nft.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      const count = await Nft.countDocuments(query);

      res.status(200).send({
        nfts,
        page,
        totalPages: Math.max(Math.ceil(count / limit), 1),
      });
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

export { router as getNftsRouter };
