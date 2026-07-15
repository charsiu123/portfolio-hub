(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.HabitsHistory = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function safeLedger(ledger) {
    return ledger && typeof ledger === 'object' && !Array.isArray(ledger) ? ledger : {};
  }

  function recordElapsed(ledger, day, habitId, seconds) {
    const amount = Math.max(0, Math.floor(Number(seconds) || 0));
    if (!day || !habitId || !amount) return ledger;

    const next = { ...safeLedger(ledger) };
    const entries = { ...(next[day] || {}) };
    entries[habitId] = Math.max(0, Math.floor(Number(entries[habitId]) || 0)) + amount;
    next[day] = entries;
    return next;
  }

  function localDayKey(date) {
    const pad = value => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function recordSession(ledger, startedAt, endedAt, habitId) {
    let remaining = Math.max(0, Math.floor((Number(endedAt) - Number(startedAt)) / 1000));
    let cursor = new Date(Number(startedAt));
    let next = ledger;
    if (!Number.isFinite(cursor.getTime()) || !remaining || !habitId) return ledger;

    while (remaining > 0) {
      const midnight = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1).getTime();
      const beforeMidnight = Math.floor((midnight - cursor.getTime()) / 1000);
      if (beforeMidnight <= 0) {
        cursor = new Date(midnight);
        continue;
      }
      const amount = Math.min(remaining, beforeMidnight);
      next = recordElapsed(next, localDayKey(cursor), habitId, amount);
      remaining -= amount;
      cursor = new Date(cursor.getTime() + amount * 1000);
    }
    return next;
  }

  function detailRows(ledger, day, habits) {
    const entries = safeLedger(ledger)[day] || {};
    const byId = new Map((Array.isArray(habits) ? habits : []).map(habit => [habit.id, habit]));

    return Object.entries(entries)
      .map(([id, elapsed]) => {
        const habit = byId.get(id);
        if (!habit) return null;
        return {
          id,
          name: habit.name,
          elapsed: Math.max(0, Math.floor(Number(elapsed) || 0)),
          min: habit.min,
          normal: habit.normal,
          stretch: habit.stretch,
        };
      })
      .filter(Boolean)
      .filter(row => row.elapsed > 0)
      .sort((a, b) => b.elapsed - a.elapsed || a.name.localeCompare(b.name));
  }

  return { recordElapsed, recordSession, detailRows };
});
