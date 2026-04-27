export async function fetchTracking(code: string) {
  const res = await fetch(`/api/tracking?code=${encodeURIComponent(code)}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || 'Tracking failed');
  }
  return res.json();
}
