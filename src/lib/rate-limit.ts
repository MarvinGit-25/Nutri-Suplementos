type RateLimitOptions = {
    limit: number;
    windowMs: number;
};

type Entry = {
    count: number;
    resetAt: number;
};

const store = new Map<string, Entry>();

export function getClientIp(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0]?.trim() || "unknown";
    }
    return request.headers.get("x-real-ip") || "unknown";
}

export function checkRateLimit(key: string, options: RateLimitOptions) {
    const now = Date.now();
    const existing = store.get(key);

    if (!existing || existing.resetAt <= now) {
        const next: Entry = {
            count: 1,
            resetAt: now + options.windowMs,
        };
        store.set(key, next);
        return { allowed: true, remaining: options.limit - 1, resetAt: next.resetAt };
    }

    if (existing.count >= options.limit) {
        return { allowed: false, remaining: 0, resetAt: existing.resetAt };
    }

    existing.count += 1;
    store.set(key, existing);
    return { allowed: true, remaining: options.limit - existing.count, resetAt: existing.resetAt };
}
