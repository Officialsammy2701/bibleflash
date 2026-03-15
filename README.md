# ✦ BibleFlash

> A Progressive Web App delivering daily Bible verses, motivational quotes, and affirmations as beautiful swipeable flashcards — with push notifications and full offline support.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://officialsammy2701.github.io/bibleflash/)
[![Backend](https://img.shields.io/badge/Backend-Render-purple?style=for-the-badge&logo=render)](https://bibleflash-api.onrender.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

---

## 📸 Screenshots

### Desktop
![BibleFlash Desktop](https://officialsammy2701.github.io/bibleflash/screenshots/desktop.png)

### Mobile
<table>
  <tr>
    <td align="center">
      <img src="https://officialsammy2701.github.io/bibleflash/screenshots/mobile-verse.png" width="240" alt="Bible Verse Card"/>
      <br/><sub>Bible Verse Card</sub>
    </td>
    <td align="center">
      <img src="https://officialsammy2701.github.io/bibleflash/screenshots/mobile-quote.png" width="240" alt="Daily Quote Card"/>
      <br/><sub>Daily Quote Card</sub>
    </td>
    <td align="center">
      <img src="https://officialsammy2701.github.io/bibleflash/screenshots/mobile-reflection.png" width="240" alt="Reflection Card"/>
      <br/><sub>Reflection Card</sub>
    </td>
  </tr>
</table>

---

## ✨ Features

- **📖 Daily Bible Verses** — Curated uplifting verses powered by API.Bible (KJV)
- **💬 Motivational Quotes** — Hand-picked daily quotes from great thinkers
- **✨ Affirmations** — Positive daily affirmations to start your day
- **🃏 Swipeable Flashcards** — Swipe left/right or use buttons to navigate cards
- **🔄 Card Flip** — Tap any card to flip and reveal the reflection side
- **🔔 Push Notifications** — Daily verse delivered to your device even when the app is closed
- **📱 PWA Installable** — Add to Home Screen on any device, works like a native app
- **🌐 Offline Support** — Cached content loads without an internet connection
- **🌟 Animated UI** — Midnight blue background with twinkling stars and glowing card borders

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 6 | Build tool & dev server |
| Framer Motion | Card animations |
| react-swipeable | Touch/swipe gestures |
| vite-plugin-pwa | PWA manifest & service worker |
| Playfair Display + DM Sans | Typography |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| node-cron | Daily push notification scheduler |
| web-push | Web Push API (VAPID) |
| API.Bible | Full Bible content (KJV) |
| dotenv | Environment variable management |

### Deployment
| Service | Purpose |
|---|---|
| GitHub Pages | Frontend hosting |
| Render | Backend hosting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Officialsammy2701/bibleflash.git
cd bibleflash

# Install root dependencies
npm install

# Install all dependencies
npm install --prefix client
npm install --prefix server
```

### Environment Setup

Create `server/.env`:

```env
PORT=5000
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_EMAIL=mailto:you@example.com
BIBLE_API_KEY=your_api_bible_key
```

Generate VAPID keys:
```bash
cd server
node -e "const wp = require('web-push'); const k = wp.generateVAPIDKeys(); console.log(k);"
```

Get a free Bible API key at [scripture.api.bible](https://scripture.api.bible)

### Development

```bash
# Run both frontend and backend simultaneously
npm run dev
```

- Frontend: `http://localhost:5173/bibleflash/`
- Backend: `http://localhost:5000`

### Production Build & Deploy

```bash
# Deploy frontend to GitHub Pages
npm run build --prefix client
cd client && npm run deploy

# Backend deploys automatically via Render on git push
git push origin main
```

---

## 📁 Project Structure

```
bibleflash/
├── client/                  # React + Vite PWA frontend
│   ├── public/
│   │   └── icons/           # PWA icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── FlashCard.jsx
│   │   │   ├── Header.jsx
│   │   │   └── NotificationToggle.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── server/                  # Node.js + Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── verse.js     # API.Bible integration
│   │   │   ├── quote.js
│   │   │   ├── date.js
│   │   │   └── push.js      # Push notification endpoints
│   │   ├── services/
│   │   │   └── cron.js      # Daily notification scheduler
│   │   └── index.js
│   └── db/
│       └── subscriptions.json
└── data/
    ├── bibleVerses.json     # Fallback verse collection
    └── quotes.json          # Motivational quotes
```

---

## 🔔 Push Notifications

BibleFlash uses the Web Push API with VAPID keys to deliver daily notifications at 8:00 AM. Subscriptions are stored server-side and notifications are sent via node-cron.

To test notifications manually:
```bash
cd server
node -e "import('./src/services/cron.js').then(m => m.startCron())"
```

---

## 📖 Bible API

Verses are fetched from [API.Bible](https://scripture.api.bible) using the King James Version (KJV). The app uses a curated list of 50 uplifting verses from Psalms, Proverbs, John, Romans, Isaiah, and more.

**Bible ID used:** `de4e12af7f28f599-01` (KJV)

---

## 🌐 Live Demo

**[→ Open BibleFlash](https://officialsammy2701.github.io/bibleflash/)**

Scan to install on mobile:

> Visit the link on your phone and tap **"Add to Home Screen"** in your browser menu.

---

## 👤 Author

**Ismail Adewale Akande**
- GitHub: [@Officialsammy2701](https://github.com/Officialsammy2701)
- Project: [BibleFlash](https://officialsammy2701.github.io/bibleflash/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Bible content provided by [API.Bible](https://scripture.api.bible) — King James Version (KJV), Public Domain.
