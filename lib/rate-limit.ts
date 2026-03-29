// lib/rate-limit.ts
const rateMap = new Map<string, { count: number; lastReset: number }>()

export function rateLimit(
  ip: string,
  { interval = 60_000, maxRequests = 10 } = {}
): { success: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now - entry.lastReset > interval) {
    rateMap.set(ip, { count: 1, lastReset: now })
    return { success: true, remaining: maxRequests - 1 }
  }

  entry.count++
  if (entry.count > maxRequests) {
    return { success: false, remaining: 0 }
  }

  return { success: true, remaining: maxRequests - entry.count }
}

// Clean up stale entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, value] of rateMap.entries()) {
      if (now - value.lastReset > 300_000) {
        rateMap.delete(key)
      }
    }
  }, 300_000)
}
