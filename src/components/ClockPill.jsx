import { useEffect, useState } from 'react';

export default function ClockPill() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const dateText = new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(now);

    const timeText = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(now);

    return (
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/75 shadow-premium">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulseSoft" />
            <span>{dateText}</span>
            <span className="text-white/25">•</span>
            <span>{timeText}</span>
        </div>
    );
}