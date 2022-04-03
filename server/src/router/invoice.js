const router = require('express').Router()
const InvoiceController = require('../controllers/invoice')
const { verifyToken } = require('../until/verifyToken')

router.post('/create', verifyToken, InvoiceController.createInvoice)
router.get('/user', verifyToken, InvoiceController.getAllInvoice)
router.get('/:id', verifyToken, InvoiceController.getInvoiceById)


module.exports = router