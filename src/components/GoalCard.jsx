import {useState} from 'react';
import {formatCurrency, formatExpectedDate} from '../utils/formatters';

function StatusBadge({status}) {
    const styles = {
        Planned: 'bg-white/6 text-white/65 border-white/10',
        'In Progress': 'bg-blue-500/12 text-blue-300 border-blue-400/20',
        Done: 'bg-emerald-500/12 text-emerald-300 border-emerald-400/20',
    };

    return (
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
    );
}

function TypeBadge({type}) {
    return (
        <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
      {type}
    </span>
    );
}

function PriorityStars({value}) {
    return (
        <div className="flex items-center gap-1" aria-label={`Priority ${value} out of 5`}>
            {Array.from({length: 5}).map((_, index) => {
                const active = index < value;
                return (
                    <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-4 w-4 ${active ? 'text-accent' : 'text-white/12'}`}
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.068-3.292z"/>
                    </svg>
                );
            })}
        </div>
    );
}

export default function GoalCard({goal}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <article
            className="group surface glass-border rounded-[28px] bg-card p-5 shadow-premium transition duration-300 hover:-translate-y-1 hover:border-white/12 hover:shadow-glow">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/35">Goal</p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-text">{goal.title}</h3>
                </div>
                <StatusBadge status={goal.status}/>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
                <TypeBadge type={goal.type}/>
                {goal.frequency ? (
                    <span
                        className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-white/65">
            {goal.frequency}
          </span>
                ) : null}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Priority</p>
                    <div className="mt-2">
                        <PriorityStars value={goal.priority}/>
                    </div>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Estimated Value</p>
                    <p className="mt-2 font-medium text-white/90">{formatCurrency(goal.estimatedValue)}</p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Expected</p>
                    <p className="mt-2 font-medium text-white/90">{formatExpectedDate(goal.expected)}</p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Achieved</p>
                    <p className="mt-2 font-medium text-white/90">{goal.achieved || '—'}</p>
                </div>
            </div>

            {goal.notes ? (
                <div className="mt-5 border-t border-white/6 pt-4">
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="flex items-center gap-2 text-sm text-white/72 transition hover:text-white"
                    >
                        <span>{expanded ? 'Hide notes' : 'View notes'}</span>
                        <span className={`transition ${expanded ? 'rotate-180' : ''}`}>⌄</span>
                    </button>
                    {expanded ? <p className="mt-3 text-sm leading-6 text-white/70">{goal.notes}</p> : null}
                </div>
            ) : null}
        </article>
    );
}