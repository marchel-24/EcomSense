import { addFavorite, getFavoritesByUser, deleteFavorite } from '../../../controllers/favoritesController.js';

export default async function handler(req, res) {
  if (req.method === 'POST') return addFavorite(req, res);
  if (req.method === 'GET') return getFavoritesByUser(req, res);
  if (req.method === 'DELETE') return deleteFavorite(req, res);

  return res.status(405).json({ message: 'Method Not Allowed' });
}
