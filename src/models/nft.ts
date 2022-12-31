import mongoose from 'mongoose';

/**
 * NftAttrs: interface to create new NftModel Document
 */
interface NftAttrs {

    /**
     * The blockchain provider the NFT was minted e.g. BTC
     */
    provider: string,

    /**
     * time nft was minted
     */
    timestamp: string,

    /**
     * the id of the token in the contract
     */
    tokenId: string,

    /**
     * smart contract address of the nft.
     */
    contractAddress: string,

    /**
     * The address of the address the nft was minted to
     */
    ownerAddress: string,

    /**
     * Name of the nft collection
     */
    name: string

    /**
     * Symbol of the nft collection
     */
    symbol: string

    /**
     * Link to the asset
     */
    uri: string

    /**
     * Symbol of the nft collection
     */
    description: string

    /**
     * other options of the nft
     */
    options: any
}

interface NftModel extends mongoose.Model<NftDoc> {
    build(attrs: NftAttrs): NftDoc;
}

export interface NftDoc extends mongoose.Document {
    provider: string,
    timestamp: string,
    tokenId: string,
    contractAddress: string,
    ownerAddress: string,
    name: string,
    symbol: string,
    description: string,
    uri: string,
    options: any
}

const nftSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            required: true
        },
        timestamp: {
            type: String,
            required: true
        },
        tokenId: {
            type: String,
            required: true,
        },
        contractAddress: {
            type: String,
            required: true,
        },
        ownerAddress: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        uri: {
            type: String,
            required: true,
        },
        options: {
            type: Object,
            required: true,
        },
    },
    {
      toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
      }
    }
);

nftSchema.statics.build = (attrs: NftAttrs) => {
    return new Nft(attrs);
};
  
const Nft = mongoose.model<NftDoc, NftModel>('Blockchain', nftSchema);
  
export { Nft };