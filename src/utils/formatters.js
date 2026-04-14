export function normalizeStatus(status = '') {
    const value = status.trim().toLowerCase();
    if (value === 'in progress') return 'In Progress';
    if (value === 'done' || value === 'completed' || value === 'complete') return 'Done';
    return 'Planned';
}

export function normalizeType(type = '') {
    const value = type.trim();
    if (!value) return 'Goal';
    return value;
}

export function normalizeCategory(category = '') {
    const value = category.trim().toLowerCase();

    if (value.includes('near future')) return 'Near Future (0–6m)';
    if (value.includes('short term')) return 'Short Term (6m–2y)';
    if (value.includes('long term')) return 'Long Term (2–5y)';
    if (value.includes('life goal')) return 'Life Goals';

    return category.trim() || 'Uncategorized';
}

export function parsePriority(priority) {
    const raw = String(priority || '').trim();
    const numeric = Number(raw);
    if (!Number.isNaN(numeric) && numeric > 0) {
        return Math.min(5, Math.max(1, Math.round(numeric)));
    }

    const normalized = raw.toLowerCase();
    if (normalized.includes('high')) return 5;
    if (normalized.includes('medium')) return 3;
    if (normalized.includes('low')) return 2;
    return 1;
}

export function parseDate(value) {
    if (!value) return null;
    const cleaned = String(value).trim();
    const direct = new Date(cleaned);
    if (!Number.isNaN(direct.getTime())) return direct;

    const parts = cleaned.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/);
    if (parts) {
        const [, a, b, c] = parts;
        const year = c.length === 2 ? `20${c}` : c;
        const asDayMonth = new Date(`${year}-${b.padStart(2, '0')}-${a.padStart(2, '0')}`);
        if (!Number.isNaN(asDayMonth.getTime())) return asDayMonth;
    }

    return null;
}

export function formatExpectedDate(value) {
    const date = parseDate(value);
    if (!date) return value || '—';
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

export function formatCurrency(value) {
    if (!value) return '—';
    const raw = String(value).replace(/,/g, '').trim();
    const numeric = Number(raw.replace(/[^\d.-]/g, ''));
    if (Number.isNaN(numeric)) return value;

    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'LKR',
        maximumFractionDigits: 0,
    }).format(numeric);
}

export function mapGoal(row) {
    return {
        id: row.id || `${row.Category || 'goal'}-${row.Goal || 'item'}`,
        category: normalizeCategory(row.Category),
        title: row.Goal?.trim() || 'Untitled Goal',
        type: normalizeType(row.Type),
        priority: parsePriority(row.Priority),
        estimatedValue: row['Estimated Value']?.trim() || '',
        frequency: row.Frequency?.trim() || '',
        expected: row.Expected?.trim() || '',
        achieved: row.Achieved?.trim() || '',
        status: normalizeStatus(row.Status),
        notes: row.Notes?.trim() || '',
    };
}

export function sortGoals(goals, mode) {
    const next = [...goals];

    if (mode === 'Priority') {
        return next.sort((a, b) => b.priority - a.priority);
    }

    return next.sort((a, b) => {
        const dateA = parseDate(a.expected);
        const dateB = parseDate(b.expected);

        if (dateA && dateB) return dateA - dateB;
        if (dateA) return -1;
        if (dateB) return 1;
        return a.title.localeCompare(b.title);
    });
}


