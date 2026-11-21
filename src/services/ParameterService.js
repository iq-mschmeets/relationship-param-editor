export default async function ParameterService(paramsToSave) {
  const data = JSON.stringify({ parameters: paramsToSave });
  
  const response = await fetch('../resource/parameter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: data
  });

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    error.response = response;
    throw error;
  }

  return response.json();
}
