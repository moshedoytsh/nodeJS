const express = require('express');
const productRouter = require('../products/routes/router');
const usersRouter = require('../users/routes/router');

const router = express.Router();

router.use('/api/products', productRouter);
router.use('/api/users', usersRouter);
router.use('/static', express.static('public'));
router.use((req, res) => {
    res.status(404).send('Resource not found.');
});

module.exports = router;