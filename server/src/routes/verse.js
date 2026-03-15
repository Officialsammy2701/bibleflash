import { Router } from "express";
import fetch from "node-fetch";

export const router = Router();

const BIBLE_ID = "9879dbb7cfe39e4d-01";

const VERSE_IDS = [
  "JHN.3.16",
  "PHP.4.13",
  "ISA.40.31",
  "PRO.3.5",
  "JER.29.11",
  "ROM.8.28",
  "PSA.23.1",
  "MAT.6.33",
  "ROM.8.38",
  "PSA.46.1",
  "ISA.41.10",
  "JOS.1.9",
  "PSA.119.105",
  "2CO.5.7",
  "GAL.5.22",
  "MAT.11.28",
  "PSA.28.7",
  "PRO.16.3",
  "1CO.13.4",
  "PSA.37.4",
  "ROM.15.13",
  "2TI.1.7",
  "PSA.34.18",
  "JHN.14.6",
  "HEB.11.1",
  "LAM.3.22",
  "PSA.139.14",
  "MAT.5.16",
  "EPH.2.8",
  "PHP.4.6",
  "PSA.91.1",
  "PSA.121.1",
  "ISA.43.2",
  "ROM.12.2",
  "MAT.5.4",
  "JHN.16.33",
  "PSA.27.1",
  "NAH.1.7",
  "1PE.5.7",
  "HEB.13.5",
  "PSA.73.26",
  "ISA.26.3",
  "MAT.6.34",
  "ROM.5.8",
  "EPH.3.20",
  "PSA.55.22",
  "PRO.18.10",
  "ISA.40.29",
  "2CO.12.9",
  "REV.21.4",
];

router.get("/", async (req, res) => {
  try {
    const randomId = VERSE_IDS[Math.floor(Math.random() * VERSE_IDS.length)];
    const response = await fetch(
      `https://rest.api.bible/v1/bibles/${BIBLE_ID}/verses/${randomId}?content-type=text&include-verse-numbers=false`,
      { headers: { "api-key": process.env.BIBLE_API_KEY } },
    );
    const data = await response.json();
    const text = data.data.content.replace(/<[^>]*>/g, "").trim();
    const reference = data.data.reference;
    res.json({ reference, text });
  } catch (err) {
    console.error("Bible API error:", err);
    res.status(500).json({ error: "Failed to fetch verse" });
  }
});
