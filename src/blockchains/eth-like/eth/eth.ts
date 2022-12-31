import { EthLike } from "../eth-like";
import Web3 from 'web3';

export class ETH extends EthLike {

    static blockchainName = 'ETH';
    
    constructor( options: { uri: string } ) 
    { 
        super();
        this.web3 =  Web3;
        this.api = new this.web3(options.uri);
    }
}