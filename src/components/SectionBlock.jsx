import { useMemo, useState } from 'react';
import GoalCard from './GoalCard';

export default function SectionBlock({ title, goals }) {
    const [open, setOpen] = useState(true);

    const countLabel = useMemo(() => `${goals.length} ${goals.length === 1 ? 'goal' : 'goals'}`, [goals.length]);

    return (
        <section className="animate-fadeUp">
            <button
                className="mb-5 flex w-full items-center justify-between gap-4 rounded-3xl border border-white/10 bg-card/80 px-5 py-4 text-left shadow-premium transition hover:bg-card"
                onClick={() => setOpen((prev) => !prev)}
            >
                <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted">Category</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">{title}</h2>
                </div>
                <div className="flex items-center gap-4">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">{countLabel}</span>
                    <span className={`text-white/45 transition ${open ? 'rotate-180' : ''}`}>⌄</span>
                </div>
            </button>

            {open ? (
                goals.length ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {goals.map((goal) => (
                            <GoalCard key={goal.id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/45">
                        No goals in this section for the current filter.
                    </div>
                )
            ) : null}
        </section>
    );
}