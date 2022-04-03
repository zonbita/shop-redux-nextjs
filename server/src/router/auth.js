const router = require('express').Router()
const authController = require('../controllers/auth')
const { verifyToken } = require('../until/verifyToken')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.put('/password', verifyToken, authController.changePassword)
router.post('/send/email', authController.sendEmail)
router.put('/reset/password', authController.resetPassword)

module.exports = router