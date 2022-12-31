import { ERC721, IErc721Metadata, IErc721MetadataExtrator, IErc721WithMetaData } from "../interface";
import { abi } from "./eth-abi";

export abstract class EthLike implements IErc721MetadataExtrator {
    /**
     * Web3 Package. e.g require('web3') 
     */
    protected web3: any;

    /**
     * web3 instance loaded with uri
     */
    protected api: any;

    async metadata(erc721: ERC721): Promise<IErc721WithMetaData> {
        try {
            const erc721Contract = this.api.eth.Contract(abi, erc721.contractAddress);
                
            const name = await erc721Contract.methods.name().call();
            const symbol = await erc721Contract.methods.symbol().call();
            const uri = await erc721Contract.methods.tokenURI(erc721.tokenId).call();

            return {
                erc721: erc721,
                metadata: {
                    name,
                    symbol,
                    uri,
                    description: ''
                }
            }

        } catch (error) {
            throw new Error("Method not implemented.");   
        }
    }
}