export function getLocalStorage(key, fallback = null) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore quota/storage issues gracefully
    }
}

export function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        // ignore
    }
}