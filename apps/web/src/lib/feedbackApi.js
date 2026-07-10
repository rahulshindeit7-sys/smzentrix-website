const FEEDBACK_API_BASE_URL = (import.meta.env.VITE_FEEDBACK_API_BASE_URL || 'https://admin.smzentrix.info/api').replace(/\/$/, '');
const FEEDBACK_API_KEY = import.meta.env.VITE_FEEDBACK_API_KEY;

function getHeaders() {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (FEEDBACK_API_KEY) {
    headers['x-api-key'] = FEEDBACK_API_KEY;
  }

  return headers;
}

export function hasFeedbackApi() {
  return Boolean(FEEDBACK_API_BASE_URL);
}

export async function submitFeedbackToApi(payload) {
  if (!FEEDBACK_API_BASE_URL) {
    throw new Error('Feedback API is not configured');
  }

  const response = await fetch(`${FEEDBACK_API_BASE_URL}/feedback/submissions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Unable to submit feedback');
  }

  return response.json();
}

export async function fetchApprovedFeedbackFromApi() {
  if (!FEEDBACK_API_BASE_URL) {
    return [];
  }

  const response = await fetch(`${FEEDBACK_API_BASE_URL}/feedback/public?status=approved`, {
    headers: getHeaders()
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Unable to fetch feedback');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}