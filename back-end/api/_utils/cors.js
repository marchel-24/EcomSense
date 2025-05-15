const allowedOrigins = ['http://localhost:3000', 'https://ecomsense.vercel.app'];

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Tangani preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true; // beri tanda kalau OPTIONS sudah ditangani
  }

  return false;
}

module.exports = applyCors;
