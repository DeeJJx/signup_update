const express = require('express');

//controller functions
const { loginUser, signupUser, getUser, updateUser } = require('../controllers/userController')

const router = express.Router();

//login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

//get user route
router.get('/:id', getUser);

//update user route
router.patch('/:id', updateUser);

module.exports = router;