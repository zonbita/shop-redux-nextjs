const router = require('express').Router()
const productController = require('../controllers/product')

const { verifyToken, verifyAdmin } = require('../until/verifyToken')

router.post('/create', verifyToken, verifyAdmin, productController.createProduct)
router.get('/:slug', productController.getProduct)
router.get('/find/:id', productController.getProductById)
router.get('/search/t/', productController.searchProduct)
router.put('/update/:id', verifyToken, verifyAdmin, productController.updateProduct)
router.delete('/delete/:id', verifyToken, verifyAdmin, productController.deleteProduct)
router.get("/", productController.getSomeProduct)

module.exports = router