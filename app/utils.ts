// checks if a provided date is "earlier" than right now
export function is_due(date: Date): boolean {
  const now = new Date();
  if (date.getTime() < now.getTime()) {
    // provided date is "earlier" than now
    return true;
  }
  // provided date is "later" than now
  return false;
}

// format date into a string i.e. Nov 10
export function format_date(date: Date): string {
  return date.toLocaleString("default", { day: "numeric", month: "short" });
}

// returns the days that have passed since the date received
export function get_days_lapsed(date: Date): number {
  const now = Date.now();
  const miliseconds = now - new Date(date).getTime();
  const total_seconds = Math.floor(miliseconds / 1000);
  const total_minutes = Math.floor(total_seconds / 60);
  const total_hours = Math.floor(total_minutes / 60);
  const days = Math.floor(total_hours / 24);
  return days;
}