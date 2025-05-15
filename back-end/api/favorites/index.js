import { addFavorite, getFavoritesByUser, deleteFavorite } from '../../controllers/favoritesController';
const {applyCors} = require('../_utils/cors');

export default async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method === 'POST') return addFavorite(req, res);
  if (req.method === 'GET') return getFavoritesByUser(req, res);
  if (req.method === 'DELETE') return deleteFavorite(req, res);

  return res.status(405).json({ message: 'Method Not Allowed' });
}
