import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import LockScreen from './components/LockScreen';
import {
  CACHE_KEY,
  CACHE_TTL_MS,
  SESSION_KEY,
  SHEET_CSV_URL,
} from './utils/constants';
import { parseCsv } from './utils/csv';
import { formatExpectedDate, mapGoal } from './utils/formatters';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from './utils/storage';

function LoadingScreen() {
  return (
      <div className="min-h-screen bg-bg bg-radialPremium px-5 py-10 text-text">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl items-center justify-center">
          <div className="surface glass-border w-full rounded-[28px] bg-card/90 p-8 text-center shadow-glow animate-fadeUp">
            <div className="mx-auto mb-5 h-10 w-10 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
            <h2 className="text-xl font-semibold">Loading dashboard</h2>
            <p className="mt-2 text-sm text-white/55">Syncing goals from your Google Sheet…</p>
          </div>
        </div>
      </div>
  );
}

function ErrorScreen({ onRetry }) {
  return (
      <div className="min-h-screen bg-bg bg-radialPremium px-5 py-10 text-text">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl items-center justify-center">
          <div className="surface glass-border w-full rounded-[28px] bg-card/90 p-8 text-center shadow-glow animate-fadeUp">
            <h2 className="text-xl font-semibold">Unable to load goals</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              The Google Sheet could not be reached right now. Please try again in a moment.
            </p>
            <button
                onClick={onRetry}
                className="mt-6 rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent transition hover:bg-accent/15"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(() => Boolean(getLocalStorage(SESSION_KEY, false)));
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!unlocked) return;

    let active = true;

    const loadGoals = async () => {
      setLoading(true);
      setError(false);

      try {
        // const cache = getLocalStorage(CACHE_KEY, null);
        // const isFresh = cache && Date.now() - cache.timestamp < CACHE_TTL_MS;
        //
        // if (isFresh && Array.isArray(cache.data)) {
        //   if (!active) return;
        //   setGoals(cache.data);
        //   setLastUpdated(cache.label || 'Recently');
        //   setLoading(false);
        //   return;
        // }

        const response = await axios.get(SHEET_CSV_URL, {
          responseType: 'text',
          headers: {
            Accept: 'text/csv, text/plain, */*',
          },
        });

        console.log("Response: ", response.data);

        const csv = response.data;
        const parsed = parseCsv(csv).map(mapGoal);

        const label = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date());

        if (!active) return;

        setGoals(parsed);
        setLastUpdated(label);
        setLocalStorage(CACHE_KEY, {
          data: parsed,
          timestamp: Date.now(),
          label,
        });
      } catch (err) {
        console.error(err);

        if (!active) return;

        const cache = getLocalStorage(CACHE_KEY, null);
        if (cache?.data?.length) {
          setGoals(cache.data);
          setLastUpdated(`${cache.label || 'Cached'} · offline cache`);
        } else {
          setError(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadGoals();

    return () => {
      active = false;
    };
  }, [unlocked, refreshKey]);

  const handleUnlock = () => {
    setUnlocked(true);
    setLocalStorage(SESSION_KEY, true);
  };

  const handleLogout = () => {
    setUnlocked(false);
    removeLocalStorage(SESSION_KEY);
  };

  const memoizedGoals = useMemo(() => goals, [goals]);

  if (!unlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  if (loading && !goals.length) {
    return <LoadingScreen />;
  }

  if (error && !goals.length) {
    return <ErrorScreen onRetry={() => setRefreshKey((prev) => prev + 1)} />;
  }

  return (
      <Dashboard
          goals={memoizedGoals}
          onLogout={handleLogout}
          lastUpdated={lastUpdated}
          fallbackExpectedFormatter={formatExpectedDate}
      />
  );
}