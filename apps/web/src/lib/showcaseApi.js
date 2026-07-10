const FEEDBACK_API_BASE_URL = (import.meta.env.VITE_FEEDBACK_API_BASE_URL || 'https://admin.smzentrix.info/api').replace(/\/$/, '');

export async function fetchPublishedShowcase() {
  const response = await fetch(`${FEEDBACK_API_BASE_URL}/showcase/public`);
  if (!response.ok) {
    throw new Error('Unable to load showcase items');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
