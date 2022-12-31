import Bull from "bull";
import { IBlockData, IErc721MetadataExtrator } from "../blockchains/interface";
import { Blockchain } from "../models/blockchain";
import blockchains from "../blockchains";
import { Nft } from "../models/nft";

export const uploadAsset = async ( job: Bull.Job<IBlockData> ) => {
    /**
     * Find the blockchain entry of the provider blockdata passed
     */
    const bc = await Blockchain.findOne({ enabled: true, symbol: job.data.provider });

    if(bc != null) { 
        /**
         * Check if blockchains contain the blockchain of the nft
         */
        if(blockchains.has(job.data.provider))
        {
            const provider = blockchains.get(job.data.provider)

            const extractor : IErc721MetadataExtrator = Reflect.construct(provider, [ bc.options ]);

            const results = await Promise.all(job.data.erc721.map(( erc721 ) => extractor.metadata(erc721)));

            const inserts = await Promise.all(results.map(async ( result ) => {
                const nft = Nft.build({
                    provider: job.data.provider ,
                    timestamp: job.data.timestamp as string,
                    tokenId: result.erc721.tokenId.toString(),
                    contractAddress: result.erc721.contractAddress,
                    ownerAddress: result.erc721.ownerAddress as string,
                    name: result.metadata.name,
                    symbol: result.metadata.symbol,
                    description: result.metadata.description,
                    uri: result.metadata.uri,
                    options: {}
                })
                await nft.save()
            }));
        }
    }
}