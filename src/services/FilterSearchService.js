export default async function FilterSearchService(term) {
  const SEARCH_URL = '../request/namedTextLocator';
  const url = `${SEARCH_URL}?term=${encodeURIComponent(term)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    error.response = response;
    throw error;
  }

  return response.json();
}
