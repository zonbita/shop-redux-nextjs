const router = require('express').Router()
const cartController = require('../controllers/cart')
const { verifyToken } = require('../until/verifyToken')

router.post('/add/:id', verifyToken, cartController.addToCart)
router.put('/plus/:id', verifyToken, cartController.plusProduct)
router.put('/minus/:id', verifyToken, cartController.minusProduct)
router.delete('/delete/:id', verifyToken, cartController.deleteProduct)
router.delete('/reset', verifyToken, cartController.resetCart)
router.get('/product', verifyToken, cartController.getCartById)
router.get('/total', verifyToken, cartController.getTotal)
router.post('/', verifyToken, cartController.createCart)

module.exports = router