import { Router } from "express";
import webpush from "web-push";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "../../db/subscriptions.json");

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

const getSubscriptions = () => {
  if (!existsSync(DB_PATH)) return [];
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
};

const saveSubscriptions = (subs) => {
  writeFileSync(DB_PATH, JSON.stringify(subs, null, 2));
};

export const router = Router();

router.get("/vapidPublicKey", (req, res) => {
  res.json({ key: process.env.VAPID_PUBLIC_KEY });
});

router.post("/subscribe", (req, res) => {
  const subscription = req.body;
  const subs = getSubscriptions();
  const exists = subs.find((s) => s.endpoint === subscription.endpoint);
  if (!exists) {
    subs.push(subscription);
    saveSubscriptions(subs);
  }
  res.status(201).json({ message: "Subscribed successfully" });
});

router.post("/unsubscribe", (req, res) => {
  const { endpoint } = req.body;
  const subs = getSubscriptions().filter((s) => s.endpoint !== endpoint);
  saveSubscriptions(subs);
  res.json({ message: "Unsubscribed successfully" });
});
