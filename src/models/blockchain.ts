import mongoose from 'mongoose';

/**
 * BlockchainAttrs: interface to create new BlockchainModel Document
 */
interface BlockchainAttrs {
    /**
     * The name of the blockchain e.g. Bitcoin
     */
    name: string,

    /**
     * The symbol (Short form) representing the blockchain e.g. BTC
     */
    symbol: string,

    /**
     * variable to confirm if the blockchain is enabled or disabled
     */
    enabled: boolean,

    /**
     * the options of the blockchain, this would be passed as contructor params
     */
    options: any
}

interface BlockchainModel extends mongoose.Model<BlockchainDoc> {
    build(attrs: BlockchainAttrs): BlockchainDoc;
}

export interface BlockchainDoc extends mongoose.Document {
    name: string,
    symbol: string,
    enabled: boolean,
    options: any
}

const blockchainSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        symbol: {
            type: String,
            required: true
        },
        enabled: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            required: true,
        }
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

blockchainSchema.statics.build = (attrs: BlockchainAttrs) => {
    return new Blockchain(attrs);
};
  
const Blockchain = mongoose.model<BlockchainDoc, BlockchainModel>('Blockchain', blockchainSchema);
  
export { Blockchain };