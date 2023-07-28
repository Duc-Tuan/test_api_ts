import express, { Response, Request } from 'express';
var router = express.Router();

const productController = require('../../controllers/ProductController');
const UploadUsers = require('../../utils/multer/UploadUser');
const ErrorUploadImage = require('../../utils/multer/ErrorUploadImage');

const cpUpload = UploadUsers.fields([
  { name: 'productImage', maxCount: 1 },
  { name: 'productImageDetail', maxCount: 4 },
]);

router.delete('/:id', productController.deleteProduct);
router.get('/', productController.index);
router.post('/', cpUpload, ErrorUploadImage, productController.createProduct);

module.exports = router;
