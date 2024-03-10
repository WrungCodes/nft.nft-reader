import mongoose from 'mongoose';
import amqp from "amqplib";
import dotenv from 'dotenv'
import { app } from './app';
import { nftRecievedQueue } from "./queues/nft-recieved-queue"

const start = async () => {
    dotenv.config()

    if (!process.env.PORT) {
        throw new Error('PORT must be defined');
    }
    
    if (!process.env.RABBITMQ_URI) {
        throw new Error('RABBITMQ_URI must be defined');
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

    try {
        await amqp.connect(process.env.RABBITMQ_URI);
        console.log('Connected to RabbitMQ');
    } catch (err) {
        console.error(err);
    }

    nftRecievedQueue()

    app.listen(process.env.PORT, () => {
        console.log('Listening on port ' + process.env.PORT);
    });

    process.on('SIGINT', function() {
        console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
        process.exit(0);
    });

    process.on('uncaughtException', function(err) {
        console.log("\nUncaught exception!", err);
    });
};

start();
