import { useState, useEffect } from 'react';
import FlashCard from './components/FlashCard';
import Header from './components/Header';
import NotificationToggle from './components/NotificationToggle';
import './App.css';

const AFFIRMATIONS = [
  'You are loved.', 'You are enough.', 'You are worthy.',
  'You are beautiful.', 'You are amazing.', 'Today is a new day.',
  'You are special.', 'You are unique.', 'You are valued.',
  'You are appreciated.', 'God has a plan for you.', 'You are not alone.'
];

function App() {
  const [verse, setVerse] = useState(null);
  const [quote, setQuote] = useState(null);
  const [date, setDate] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [verseRes, quoteRes, dateRes] = await Promise.all([
          fetch('/api/verse'),
          fetch('/api/quote'),
          fetch('/api/date')
        ]);
        const [verseData, quoteData, dateData] = await Promise.all([
          verseRes.json(),
          quoteRes.json(),
          dateRes.json()
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
    fetchData();
  }, []);

  const refresh = () => {
    setLoading(true);
    setVerse(null);
    setQuote(null);
    setTimeout(() => {
      const fetchData = async () => {
        try {
          const [verseRes, quoteRes] = await Promise.all([
            fetch('/api/verse'),
            fetch('/api/quote')
          ]);
          const [verseData, quoteData] = await Promise.all([
            verseRes.json(),
            quoteRes.json()
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
      fetchData();
    }, 300);
  };

  return (
    <div className="app">
      <Header date={date} />
      <FlashCard verse={verse} quote={quote} affirmation={affirmation} loading={loading} onRefresh={refresh} />
      <NotificationToggle />
    </div>
  );
}

export default App;
