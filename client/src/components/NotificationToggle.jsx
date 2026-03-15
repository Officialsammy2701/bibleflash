import { useState, useEffect } from 'react';
import './NotificationToggle.css';

function NotificationToggle() {
  const [status, setStatus] = useState('default');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setStatus(Notification.permission);
    }
  }, []);

  const subscribe = async () => {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const keyRes = await fetch('/api/push/vapidPublicKey');
      const { key } = await keyRes.json();

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: key
      });

      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      });

      setStatus('granted');
    } catch (err) {
      console.error('Subscription failed:', err);
      setStatus('denied');
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: sub.endpoint })
        });
        await sub.unsubscribe();
      }
      setStatus('default');
    } catch (err) {
      console.error('Unsubscribe failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!('Notification' in window)) return null;

  return (
    <div className="notif-toggle">
      {status === 'granted' ? (
        <button className="notif-btn active" onClick={unsubscribe} disabled={loading}>
          🔔 {loading ? 'Updating...' : 'Notifications On'}
        </button>
      ) : (
        <button className="notif-btn" onClick={subscribe} disabled={loading || status === 'denied'}>
          🔕 {loading ? 'Enabling...' : status === 'denied' ? 'Notifications Blocked' : 'Enable Notifications'}
        </button>
      )}
    </div>
  );
}

export default NotificationToggle;
