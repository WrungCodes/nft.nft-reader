import express from 'express';
import { json } from 'body-parser'

const app = express();

app.use(json());

app.all('*', async (req, res) => {
    res.status(404).send();
});
  
export { app };