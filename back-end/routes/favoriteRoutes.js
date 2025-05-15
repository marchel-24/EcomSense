const express = require("express");
const router = express.Router();
const {
  addFavorite,
  getFavoritesByUser,
  deleteFavorite,
} = require("../controllers/favoritesController");

router.post("/favorites", addFavorite);
router.get("/favorites", getFavoritesByUser);
router.delete("/favorites", deleteFavorite);

module.exports = router;
