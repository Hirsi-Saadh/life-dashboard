import {SORT_OPTIONS, STATUS_OPTIONS} from '../utils/constants';

export default function Filters({status, sortBy, onStatusChange, onSortChange}) {
    return (
        <>
            <div
                className="hidden md:flex items-center gap-3 rounded-3xl border border-white/10 bg-card/90 p-3 shadow-premium">
                <div className="flex flex-wrap items-center gap-2">
                    {STATUS_OPTIONS.map((option) => {
                        const active = option === status;
                        return (
                            <button
                                key={option}
                                onClick={() => onStatusChange(option)}
                                className={`rounded-full px-4 py-2 text-sm transition ${
                                    active
                                        ? 'bg-accent/15 text-accent border border-accent/20'
                                        : 'bg-white/[0.03] text-white/70 border border-white/5 hover:bg-white/[0.05]'
                                }`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                <div className="ml-auto">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white outline-none focus:border-accent/30"
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                Sort: {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div
                className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0d0e13]/95 p-3 backdrop-blur md:hidden">
                <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto">
                    {STATUS_OPTIONS.map((option) => {
                        const active = option === status;
                        return (
                            <button
                                key={option}
                                onClick={() => onStatusChange(option)}
                                className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                                    active
                                        ? 'bg-accent/15 text-accent border border-accent/20'
                                        : 'bg-white/[0.04] text-white/75 border border-white/10'
                                }`}
                            >
                                {option}
                            </button>
                        );
                    })}

                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="ml-auto shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white outline-none"
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}