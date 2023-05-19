const express = require('express');

const router = express.Router();

//controller functions
const { signupEarlyAccessUser } = require('../controllers/earlyAccessController');

//signup route
router.post('/signup', signupEarlyAccessUser);

module.exports = router;