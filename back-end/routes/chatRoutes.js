const express = require('express');
const { getAllHistory, sentChat, deleteChat} = require('../controllers/chatController');

const router = express.Router();

router.get('/', getAllHistory);
router.post('/', sentChat);
router.delete('/', deleteChat);

module.exports = router;
