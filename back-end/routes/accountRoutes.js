const express = require('express');
const { createAccount, getAccounts, updatePasswrd, getUserAccount} = require('../controllers/accountController');

const router = express.Router();

router.post('/', createAccount);
router.get('/', getAccounts);
router.get('/getUser', getUserAccount);
router.patch('/:id', updatePasswrd);

module.exports = router;
