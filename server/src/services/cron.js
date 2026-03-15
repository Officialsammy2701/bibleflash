import cron from 'node-cron';
import webpush from 'web-push';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '../../db/subscriptions.json');
const VERSES_PATH = join(__dirname, '../../../data/bibleVerses.json');

export const startCron = () => {
  cron.schedule('0 8 * * *', async () => {
    console.log('Sending daily push notifications...');
    if (!existsSync(DB_PATH)) return;

    const subs = JSON.parse(readFileSync(DB_PATH, 'utf-8'));
    const verses = JSON.parse(readFileSync(VERSES_PATH, 'utf-8'));
    const verse = verses.verses[Math.floor(Math.random() * verses.verses.length)];

    const payload = JSON.stringify({
      title: 'BibleFlash — Daily Verse',
      body: `${verse.reference}: ${verse.text.slice(0, 80)}...`,
      url: '/'
    });

    const results = await Promise.allSettled(
      subs.map(sub => webpush.sendNotification(sub, payload))
    );

    const failed = results.filter(r => r.status === 'rejected').length;
    console.log(`Sent: ${results.length - failed}, Failed: ${failed}`);
  });

  console.log('Cron scheduler started — daily notifications at 8:00 AM');
};
