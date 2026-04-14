export default function StatCard({ label, value, tone = 'default' }) {
    const toneClass = {
        default: 'text-text',
        blue: 'text-accentBlue',
        green: 'text-emerald-400',
    }[tone] || 'text-text';

    return (
        <div className="surface glass-border rounded-3xl bg-card p-5 shadow-premium">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
            <div className={`mt-3 text-3xl font-semibold tracking-tight ${toneClass}`}>{value}</div>
        </div>
    );
}