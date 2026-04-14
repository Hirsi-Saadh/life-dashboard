import { useMemo, useState } from 'react';
import ClockPill from './ClockPill';
import Filters from './Filters';
import SectionBlock from './SectionBlock';
import StatCard from './StatCard';
import { CATEGORY_ORDER } from '../utils/constants';
import { sortGoals } from '../utils/formatters';

export default function Dashboard({ goals, onLogout, lastUpdated }) {
    const [status, setStatus] = useState('All');
    const [sortBy, setSortBy] = useState('Expected Date');

    const filteredGoals = useMemo(() => {
        const statusFiltered =
            status === 'All' ? goals : goals.filter((goal) => goal.status === status);

        return sortGoals(statusFiltered, sortBy);
    }, [goals, status, sortBy]);

    const groupedGoals = useMemo(() => {
        const groups = Object.fromEntries(CATEGORY_ORDER.map((category) => [category, []]));

        filteredGoals.forEach((goal) => {
            if (!groups[goal.category]) groups[goal.category] = [];
            groups[goal.category].push(goal);
        });

        return groups;
    }, [filteredGoals]);

    const summary = useMemo(() => {
        const completed = goals.filter((goal) => goal.status === 'Done').length;
        const inProgress = goals.filter((goal) => goal.status === 'In Progress').length;
        return {
            total: goals.length,
            completed,
            inProgress,
        };
    }, [goals]);

    return (
        <div className="min-h-screen bg-bg bg-radialPremium text-text">
            <div className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
                <header className="mb-8 animate-fadeUp">
                    <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-card/85 p-6 shadow-glow lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.32em] text-muted">Personal Space</p>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                                <span className="text-gradient">Life Dashboard</span>
                            </h1>
                            <p className="mt-3 text-sm text-white/62 sm:text-base">
                                Intentions. Effort. Gratitude.
                            </p>
                            {lastUpdated ? (
                                <p className="mt-3 text-xs tracking-[0.16em] text-white/35 uppercase">
                                    Last synced: {lastUpdated}
                                </p>
                            ) : null}
                        </div>

                        <div className="flex flex-col items-start gap-3 lg:items-end">
                            <ClockPill />
                            <button
                                onClick={onLogout}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                            >
                                Lock Dashboard
                            </button>
                        </div>
                    </div>
                </header>

                <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatCard label="Total Goals" value={summary.total} />
                    <StatCard label="In Progress" value={summary.inProgress} tone="blue" />
                    <StatCard label="Completed" value={summary.completed} tone="green" />
                </section>

                <section className="mb-8">
                    <Filters
                        status={status}
                        sortBy={sortBy}
                        onStatusChange={setStatus}
                        onSortChange={setSortBy}
                    />
                </section>

                <main className="space-y-7">
                    {CATEGORY_ORDER.map((category) => (
                        <SectionBlock key={category} title={category} goals={groupedGoals[category] || []} />
                    ))}
                </main>
            </div>
        </div>
    );
}