import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(__dirname, '..', '..', '..', 'data', 'bibleVerses.json');
const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

export const router = Router();

router.get('/', (req, res) => {
  const verse = data.verses[Math.floor(Math.random() * data.verses.length)];
  res.json(verse);
});