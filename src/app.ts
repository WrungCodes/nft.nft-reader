import express from 'express';
import { json } from 'body-parser'
import { getNftsRouter } from "./routes/get-nfts";

const app = express();

app.use(json());

app.use(getNftsRouter)

app.all('*', async (req, res) => {
    res.status(404).send();
});
  
export { app };