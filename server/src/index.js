import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as verseRouter } from './routes/verse.js';
import { router as quoteRouter } from './routes/quote.js';
import { router as pushRouter } from './routes/push.js';
import { router as dateRouter } from './routes/date.js';
import { startCron } from './services/cron.js';

dotenv.config();

const app = express();
app.use(cors({ 
  origin: ['http://localhost:5173', 'https://officialsammy2701.github.io'] 
}));
app.use(express.json());

app.get('/', (req, res) => res.send('BibleFlash API is running!'));

app.use('/api/verse', verseRouter);
app.use('/api/quote', quoteRouter);
app.use('/api/push', pushRouter);
app.use('/api/date', dateRouter);

startCron();

app.listen(process.env.PORT || 5000, () => {
  console.log(`BibleFlash server running on port ${process.env.PORT || 5000}`);
});
