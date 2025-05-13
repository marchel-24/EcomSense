const express = require("express");
const router = express.Router();
const {
  addFavorite,
  getFavoritesByUser,
} = require("../controllers/favoritesController");

router.post("/favorites", addFavorite);
router.get("/favorites", getFavoritesByUser);

module.exports = router;
