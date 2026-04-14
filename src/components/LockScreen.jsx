import {useMemo, useState} from 'react';
import {ACCESS_DATE_ISO} from '../utils/constants';

function formatDateHint(iso) {
    const [year, month, day] = iso.split('-');
    return `${day}/${month}/${year}`;
}

export default function LockScreen({onUnlock}) {
    const [selectedDate, setSelectedDate] = useState('');
    const [touched, setTouched] = useState(false);

    const isCorrect = useMemo(() => selectedDate === ACCESS_DATE_ISO, [selectedDate]);
    const showError = touched && selectedDate && !isCorrect;

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched(true);

        if (selectedDate === ACCESS_DATE_ISO) {
            onUnlock();
        }
    };

    return (
        <div className="min-h-screen bg-bg bg-radialPremium px-5 py-8 text-text">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
                <div
                    className="surface glass-border w-full rounded-[28px] bg-card/90 p-6 shadow-glow animate-fadeUp sm:p-8">
                    <div className="mb-8 text-center">
                        <div
                            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-accent shadow-premium">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z"
                                />
                            </svg>
                        </div>
                        <p className="mb-2 text-xs uppercase tracking-[0.32em] text-muted">Private Access</p>
                        <h1 className="text-2xl font-semibold tracking-tight text-text">Life Dashboard</h1>
                        <p className="mt-2 text-sm leading-6 text-muted">
                            Select the correct date to enter.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="access-date" className="mb-2 block text-sm font-medium text-white/80">
                                Access date
                            </label>
                            <input
                                id="access-date"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                onBlur={() => setTouched(true)}
                                max="2100-12-31"
                                min="1900-01-01"
                                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-text outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                                required
                            />
                            <div className="mt-2 min-h-[20px] text-sm">
                                {showError ? (
                                    <p className="text-amber-200/75">That date does not unlock this dashboard.</p>
                                ) : (
                                    <p className="text-muted">Use the exact date. Format is strictly validated by the
                                        calendar input.</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-2xl border border-accent/20 bg-accent/12 px-4 py-3 text-sm font-semibold tracking-wide text-accent transition hover:bg-accent/18 focus:outline-none focus:ring-2 focus:ring-accent/20"
                        >
                            Unlock
                        </button>
                    </form>

                    {/*<p className="mt-6 text-center text-xs tracking-[0.22em] text-white/25">*/}
                    {/*    {formatDateHint(ACCESS_DATE_ISO)}*/}
                    {/*</p>*/}
                </div>
            </div>
        </div>
    );
}