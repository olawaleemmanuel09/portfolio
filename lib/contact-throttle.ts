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
 * Admission is also subject to an independent aggregate budget of 30 attempts
 * per ten minutes by default. This is not a distributed sending-quota guarantee.
 */
export function createContactThrottle(
  capacity = 500,
  maxPerWindow = 3,
  windowMs = 10 * 60 * 1000,
  now = Date.now,
  maxTotalPerWindow = 30,
) {
  const hits = new Map<string, number[]>();
  // Independent aggregate budget survives address eviction. Bound both
  // memory and provider attempts even when clients rotate genuine IPs.
  let total: number[] = [];
  return function rateLimited(ip: string): boolean {
    const time = now();
    total = total.filter(t => time - t < windowMs);
    if (total.length >= maxTotalPerWindow) return true;
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
    total.push(time);
    return false;
  };
}
