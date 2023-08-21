const express = require('express');
const controllers = require('../controllers/controllers');

const router = express.Router();

router.get('/', controllers.getAllProducts);
router.get('/:id', controllers.getProductById);
router.patch('/:id', controllers.updateProduct);
router.post('/update-quantity/:id', controllers.updateQuantity);
router.post('/', controllers.appendProduct);
router.delete('/:id', controllers.deleteProduct);
router.delete('/', controllers.deleteAll);


module.exports = router;