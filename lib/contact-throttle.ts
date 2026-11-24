import { isIP } from "node:net";

/**
 * Vercel sets the client forwarding header at its trusted ingress.
 * Never trust arbitrary forwarded values on a standalone Node server.
 * The fallback bucket is deliberately conservative; configure a trusted
 * ingress / durable rate limiter before using a different production host.
 */
export function clientAddress(headers: Headers, onVercel: boolean): string {
  if (!onVercel) return "unknown";
  const ip = headers.get("x-vercel-forwarded-for")?.trim() ?? "";
  return isIP(ip) ? ip : "unknown";
}

/**
 * Bounded LRU throttle; admission never fails merely because the map is full.
 * This is per instance, not a distributed sending-quota guarantee.
 */
export function createContactThrottle(
  capacity = 500,
  maxPerWindow = 3,
  windowMs = 10 * 60 * 1000,
  now = Date.now,
) {
  const hits = new Map<string, number[]>();
  return function rateLimited(ip: string): boolean {
    const time = now();
    const recent = (hits.get(ip) ?? []).filter(t => time - t < windowMs);
    if (recent.length >= maxPerWindow) return true;
    if (!hits.has(ip) && hits.size >= capacity) {
      for (const [key, times] of hits) {
        if (times.every(t => time - t >= windowMs)) hits.delete(key);
      }
      if (hits.size >= capacity) {
        const oldest = hits.keys().next().value;
        if (oldest !== undefined) hits.delete(oldest);
      }
    }
    hits.delete(ip);
    hits.set(ip, [...recent, time]);
    return false;
  };
}
