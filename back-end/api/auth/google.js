import { googleLogin } from '../../controllers/authController';
const applyCors = require("../_utils/cors");

export default async function handler(req, res) {
    if (applyCors(res,req)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  return googleLogin(req, res);
}
