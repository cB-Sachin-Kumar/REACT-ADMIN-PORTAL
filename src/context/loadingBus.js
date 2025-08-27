// Simple global loading event bus (reference-counted)
// Usage:
//  - increment()/decrement() around async work
//  - subscribe(listener) to get count updates
//  - isActive() returns whether any work is in progress

let count = 0;
const listeners = new Set();

export const loadingBus = {
  increment() {
    count += 1;
    for (const l of listeners) l(count);
  },
  decrement() {
    count = Math.max(0, count - 1);
    for (const l of listeners) l(count);
  },
  clear() {
    count = 0;
    for (const l of listeners) l(count);
  },
  isActive() {
    return count > 0;
  },
  subscribe(listener) {
    listeners.add(listener);
    // emit current immediately
    try {
      listener(count);
    } catch {}
    return () => listeners.delete(listener);
  },
};

// Helper to run a promise with loader automatically
export async function withLoader(promise) {
  try {
    loadingBus.increment();
    const result = await promise;
    return result;
  } finally {
    loadingBus.decrement();
  }
}
