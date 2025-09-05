export function parseDuration(duration: string | number | undefined): number {
  if (!duration) return 0;

  if (typeof duration === "number") {
    // already in minutes
    return duration * 60;
  }

  // duration is string e.g. "10 min" or "5m" or "30s"
  const lower = duration.toLowerCase().trim();

  if (lower.includes("min")) {
    const mins = parseInt(lower, 10);
    return isNaN(mins) ? 0 : mins * 60;
  }

  if (lower.includes("sec") || lower.includes("s")) {
    const secs = parseInt(lower, 10);
    return isNaN(secs) ? 0 : secs;
  }

  // fallback if nothing matches
  return 0; 
}
