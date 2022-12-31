import mongoose from 'mongoose';
import Bull from "bull";

import { app } from './app';
import blockchains from "./blockchains";
import { Blockchain } from "./models/blockchain";
import { IErc721MetadataExtrator } from "./blockchains/interface";
import { uploadAsset } from "./events/upload-asset";

const start = async () => {
    if (!process.env.REDIS) {
        throw new Error('REDIS must be defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDb');
    } catch (err) {
        console.error(err);
    }

    /**
     * This queue acts like a message queue for other services to recieve blockdata information scanned by 
     * this service
     */
    const uploadAssetQueue = new Bull( 'upload-asset', process.env.REDIS );

    /**
     * Worker to handle new block data mainly to increased processed blocks count in the database
     */
    uploadAssetQueue.process((job) => {
        // use the uri, contract address and token Id, to get the metadata of the nft
        uploadAsset(job)
    });
    

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!');
    });

};

start();
