const express = require('express');
const controllers = require('../controllers/controllers');

const router = express.Router()

router.post('/login', controllers.login);
router.post('/signup', controllers.signup);

module.exports = router;

