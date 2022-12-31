import express from 'express';
import { json } from 'body-parser'
import 'express-async-errors';

const app = express();

app.set('trust proxy', true);

app.use(json());

app.all('*', async (req, res) => {
    throw new Error('Not Found');
});
  
export { app };