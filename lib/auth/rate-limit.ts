import "server-only";

// Login throttling, kept in memory (one app instance, so that's enough).
// Failures are counted per username AND per client address; either one hitting
// the limit blocks further attempts until the window has passed.
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

const failures = new Map<string, number[]>();

function recent(key: string, now: number) {
  const list = (failures.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length) failures.set(key, list);
  else failures.delete(key);
  return list;
}

export function isLoginBlocked(keys: string[]): boolean {
  const now = Date.now();
  return keys.some((k) => recent(k, now).length >= MAX_FAILURES);
}

export function recordLoginFailure(keys: string[]) {
  const now = Date.now();
  for (const k of keys) failures.set(k, [...recent(k, now), now]);
}

export function clearLoginFailures(keys: string[]) {
  for (const k of keys) failures.delete(k);
}
