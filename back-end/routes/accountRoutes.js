// const express = require('express');
// const { createAccount, getAccounts, updatePasswrd, getUserAccount} = require('../controllers/accountController');

// const router = express.Router();

// router.post('/', createAccount);
// router.get('/', getAccounts);
// router.get('/getUser', getUserAccount);
// router.patch('/:id', updatePasswrd);

// module.exports = router;


// back-end/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/users', accountController.getAllUsers);

module.exports = router;
