function splitCsvLine(line) {
    const values = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        const next = line[i + 1];

        if (char === '"') {
            if (insideQuotes && next === '"') {
                current += '"';
                i += 1;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    values.push(current.trim());
    return values;
}

export function parseCsv(csvText) {
    const rows = [];
    let current = '';
    let quoteCount = 0;

    for (const char of csvText) {
        if (char === '"') quoteCount += 1;

        if (char === '\n' && quoteCount % 2 === 0) {
            rows.push(current.replace(/\r$/, ''));
            current = '';
            quoteCount = 0;
        } else {
            current += char;
        }
    }

    if (current.trim()) rows.push(current.replace(/\r$/, ''));

    if (!rows.length) return [];

    const headers = splitCsvLine(rows[0]).map((h) => h.trim());

    return rows.slice(1).filter(Boolean).map((row, index) => {
        const cols = splitCsvLine(row);
        const entry = {};

        headers.forEach((header, i) => {
            entry[header] = (cols[i] || '').replace(/^"|"$/g, '').trim();
        });

        entry.id = `${entry.Category || 'goal'}-${entry.Goal || index}-${index}`;
        return entry;
    });
}