import { IBlockData, IErc721MetadataExtrator } from "../blockchains/interface";
import { Blockchain } from "../models/blockchain";
import blockchains from "../blockchains";
import { Nft } from "../models/nft";

export const uploadAsset = async ( data: IBlockData ) => {
    console.log('RECIEVED AN EVENT')
    /**
     * Find the blockchain entry of the provider blockdata passed
     */
    const bc = await Blockchain.findOne({ enabled: true, symbol: data.provider });
    
    if(bc != null) { 
        /**
         * Check if blockchains contain the blockchain of the nft
         */
        if(blockchains.has(data.provider))
        {
            const provider = blockchains.get(data.provider)

            const extractor : IErc721MetadataExtrator = Reflect.construct(provider, [ bc.options ]);

            const results = await Promise.all(data.erc721.map(( erc721 ) => extractor.metadata(erc721)));

            const inserts = await Promise.all(results.map(async ( result ) => {
                const nft = Nft.build({
                    provider: data.provider ,
                    timestamp: data.timestamp as string,
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