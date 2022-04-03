const dotenv = require('dotenv')
const User = require('../model/User')
const jwt = require('jsonwebtoken')

dotenv.config()

async function verifyToken(req, res, next) {
    const authHeader = req.headers.token  
    
    if(!authHeader) {
        return res.status(401).json({ 
            success: false,
            message: 'Token not found'
        })
    }

    try {
        jwt.verify(authHeader, process.env.SECRET_KEY, (err, user) => {
            if(err) {
                return res.status(402).json({
                    success: false,
                    message: 'Token not invalid',
                    token: authHeader
                })
            }

            req.body.userId = user.userId
            next()
        })
    }
    catch(err) {
        console.log(err);

        return res.status(500).json({ 
            success: false,
            message: 'Internal server error'
        })
    }    
}

async function verifyAdmin(req, res, next) {
    try {
        const admin = await User.findOne({ _id: req.body.userId, isAdmin: true })

        if(!admin) {
            return res.status(400).json({ 
                success: false,
                message: 'You are not admin'
            })
        }

        req.body.admin = admin._doc 
        next()
    }
    catch(err) {
        return res.status(500).json({ 
            success: false,
            message: 'Internal Server Error'
        })
    }
}

module.exports = {verifyToken, verifyAdmin}