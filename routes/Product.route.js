const express = require('express');
const router = express.Router();

const productController = require('../Controllers/Product.Controller')



router.get('/', productController.getAllProducts);
router.post('/', productController.createNewProduct);
router.get('/:id', productController.findProductById);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deletingProduct);



module.exports = router;