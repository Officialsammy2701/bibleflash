import { useState, useEffect, useRef } from 'react';
import FlashCard from './components/FlashCard';
import Header from './components/Header';
import NotificationToggle from './components/NotificationToggle';
import './App.css';

const AFFIRMATIONS = [
  'You are loved.', 'You are enough.', 'You are worthy.',
  'You are beautifully made.', 'You are amazing.', 'Today is a new day.',
  'You are special.', 'You are unique.', 'You are valued.',
  'You are appreciated.', 'God has a plan for you.', 'You are not alone.'
];

function App() {
  const [verse, setVerse] = useState(null);
  const [quote, setQuote] = useState(null);
  const [date, setDate] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(true);
  const starsRef = useRef(null);

  useEffect(() => {
    if (starsRef.current) {
      for (let i = 0; i < 70; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.cssText = `width:${size}px;height:${size}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;--d:${2 + Math.random() * 4}s;--delay:-${Math.random() * 4}s`;
        starsRef.current.appendChild(star);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [verseRes, quoteRes, dateRes] = await Promise.all([
        fetch('https://bibleflash-api.onrender.com/api/verse'),
        fetch('https://bibleflash-api.onrender.com/api/quote'),
        fetch('https://bibleflash-api.onrender.com/api/date')
      ]);
      const [verseData, quoteData, dateData] = await Promise.all([
        verseRes.json(), quoteRes.json(), dateRes.json()
      ]);
      setVerse(verseData);
      setQuote(quoteData);
      setDate(dateData.date);
      setAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    setVerse(null);
    setQuote(null);
    try {
      const [verseRes, quoteRes] = await Promise.all([
        fetch('https://bibleflash-api.onrender.com/api/verse'),
        fetch('https://bibleflash-api.onrender.com/api/quote')
      ]);
      const [verseData, quoteData] = await Promise.all([
        verseRes.json(), quoteRes.json()
      ]);
      setVerse(verseData);
      setQuote(quoteData);
      setAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="stars" ref={starsRef} />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Header date={date} />
      <FlashCard verse={verse} quote={quote} affirmation={affirmation} loading={loading} onRefresh={refresh} />
      <NotificationToggle />
    </div>
  );
}

export default App;
