// Limits accidental repeated operations within this tab.
// Server-side requests need their own authorization and rate limits.

const WINDOW_MS = 60000; // 1 minute
const MAX_OPS_PER_WINDOW = 35; // Maximum PDF operations per minute

const attempts = [];

export function checkClientRateLimit() {
  const now = Date.now();
  // Clear expired records
  while (attempts.length && attempts[0] < now - WINDOW_MS) {
    attempts.shift();
  }

  if (attempts.length >= MAX_OPS_PER_WINDOW) {
    const waitTime = Math.ceil((WINDOW_MS - (now - attempts[0])) / 1000);
    throw new Error(`Rate limit exceeded. Please wait ${waitTime}s before processing again.`);
  }

  attempts.push(now);
  return { remaining: MAX_OPS_PER_WINDOW - attempts.length };
}

export function resetClientRateLimit() {
  attempts.length = 0;
}
