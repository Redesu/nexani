class Cache {
    private cache = new Map<string, { value: unknown; expiresAt: number }>();

    get<T>(key: string): T | undefined {
        const entry = this.cache.get(key);
        if (!entry) return undefined;

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return undefined;
        }

        return entry.value as T;
    }

    set<T>(key: string, value: T, ttl: number = 60 * 1000): void {
        this.cache.set(key, {
            value,
            expiresAt: Date.now() + ttl
        });
    }

    clear(key?: string): void {
        if (key) {
            this.cache.delete(key);
        } else {
            this.cache.clear();
        }
    }
}

export const cache = new Cache();