
/**
 * get metadata 
 */
export interface IErc721MetadataExtrator {
    metadata(erc721: ERC721): Promise<IErc721WithMetaData>;
}

/**
 * IBlockData carries the information on a scanned and extracted from a block
 */
export interface IBlockData {
    /**
     * The name of the Blockchain that the block was created in, e.g. ETH, BSC ..
     */
    provider: string;

    /**
     * The height of the block that was scanned 
     */
    height: number;

    /**
     * Time the block was created
     */
    timestamp?: string;

    /**
     * collection of all minted erc721 transaction that was included in the block
     */
    erc721: ERC721[];
}

export interface IErc721Metadata {
    /**
     * The name NFT collection
     */
    name: string;

    /**
     * the symbol of the NFT
     */
    symbol: string;

    /**
     * The link to media of the nft
     */
    uri: any;

    /**
     * The description of the NFT 
     */
    description: any;
}

/**
 * This is the ERC721 Data retrieved from each appliabale transactions in a block
 */
export interface ERC721 {
    /**
     * The contract address of the ERC721 
     */
    contractAddress: string;

    /**
     * Token ID of the NFT
     */
    tokenId: number;

    /**
     * Address of the owner of the NFT after the mint
     */
    ownerAddress?: string;
}

/**
 * Combination of both erc721 and its metadata
 */
export interface IErc721WithMetaData {
    erc721: ERC721;

    metadata: IErc721Metadata;
}
