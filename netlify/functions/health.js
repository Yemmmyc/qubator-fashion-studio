// Netlify-compatible equivalent of the Express GET /api/health route in server.js.
// Mock/test data only. No secrets, no external calls.
exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'ok', app: 'fashion-studio-prototype', mock: true }),
  };
};
