import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  res.json({ date: `${day}, ${date}` });
});
