const db = require("../db");

exports.addFavorite = async (req, res) => {
  const { user_id, product_url, product_price, product_image, store_name } = req.body;

  if (!user_id || !product_url) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  try {
    await db.query(
      "INSERT INTO favorites (user_id, product_url, product_price, product_image, store_name) VALUES ($1, $2, $3, $4, $5)",
      [user_id, product_url, product_price, product_image, store_name]
    );
    res.status(201).json({ message: "Favorit berhasil disimpan" });
  } catch (err) {
    console.error("Gagal menyimpan favorit:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.getFavoritesByUser = async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).json({ message: "user_id wajib disertakan" });
  }

  try {
    const result = await db.query(
      "SELECT * FROM favorites WHERE user_id = $1 ORDER BY saved_at DESC",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Gagal mengambil data favorit:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.deleteFavorite = async (req, res) => {
  console.log("BODY MASUK DELETE:", req.body);
  const { user_id, product_url } = req.body;

  if (!user_id || !product_url) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  try {
    await db.query(
      "DELETE FROM favorites WHERE user_id = $1 AND product_url = $2",
      [user_id, product_url]
    );
    res.json({ message: "Favorit berhasil dihapus" });
  } catch (err) {
    console.error("Gagal menghapus favorit:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
