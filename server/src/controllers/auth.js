const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

const User = require('../model/User')

dotenv.config()

class AuthController {
    // [POST] /register
    async register(req, res) {
        const { surname, name, email, password, rePassword } = req.body

        if (password !== rePassword) {
            return res.status(202).json({
                success: false,
                message: 'Password does not match',
                enumError: 1
            })
        }

        if (password.length < 6) {
            return res.status(202).json({
                success: false,
                message: 'Password length is too short',
                enumError: 2
            })
        }

        if (!surname || !name || !email || !password) {
            return res.status(202).json({
                success: false,
                message: 'Missing username, email or password',
                enumError: 3
            })
        }

        try {
            const email = await User.findOne({ email: req.body.email })
            if (email) {
                return res.status(202).json({
                    success: false,
                    message: 'Email is already in use',
                    enumError: 4
                })
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const confirmationCode = await jwt.sign({ email: req.body.email }, process.env.SECRET_KEY)

            const user = new User({
                surname: surname,
                name: name,
                email: req.body.email,
                password: hashPassword,
                confirmationCode: confirmationCode
            })

            await user.save()

            return res.status(200).json({
                success: true,
                message: 'Create new user successfully',
            })
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                enumError: 0
            })
        }
    }

    // [POST] /login 
    async login(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(202).json({
                success: false,
                message: 'Missing email or password',
                enumError: 1
            })
        }

        if (password.length < 6) {
            return res.status(202).json({
                success: false,
                message: 'Password length is too short',
                enumError: 2
            })
        }

        try {
            const user = await User.findOne({ email: req.body.email })

            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: 'User not found',
                    enumError: 3
                })
            }

            const hashPassword = user.password
            const checkPassword = await bcrypt.compare(password, hashPassword)

            if (checkPassword) {
                const accessToken = await jwt.sign(
                    {
                        userId: user._id,
                        isAdmin: user.isAdmin
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "5d"
                    }
                )

                const { password, isAdmin, confirmationCode, ...info } = user._doc

                return res.status(200).json({
                    success: true,
                    message: "Login successfully",
                    accessToken,
                    info
                })

            }
            else {
                return res.status(200).json({
                    success: false,
                    message: 'Password does not match',
                    enumError: 4
                })
            }
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                enumError: 0
            })
        }
    }

    // [PUT] /password 
    async changePassword(req, res) {
        const { currentPassword, newPassword, rePassword, userId } = req.body

        console.log(currentPassword, newPassword, rePassword, userId);

        if (newPassword !== rePassword) return res.status(202).json({
            success: false,
            message: 'Password does not match',
            enumError: 1
        })

        try {
            const user = await User.findById({ _id: userId })

            const hashPassword = user.password
            const checkPassword = await bcrypt.compare(currentPassword, hashPassword)

            if (!currentPassword || !newPassword || !rePassword) {
                return res.status(202).json({
                    success: false,
                    message: 'Missing email or password',
                    enumError: 4
                })
            }

            if (!checkPassword) return res.status(202).json({
                success: false,
                message: 'Incorrect password',
                enumError: 2
            })

            if (newPassword.length < 6) {
                return res.status(202).json({
                    success: false,
                    message: 'Password length is too short',
                    enumError: 3
                })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(newPassword, salt)

            const newUser = await User.findOneAndUpdate(
                {
                    _id: userId
                },
                {
                    password: hashedPass
                },
                {
                    returnDocument: 'after'
                }
            )

            console.log(newUser);

            const { password, isAdmin, ...info } = newUser._doc

            return res.status(200).json({
                success: true,
                user: info
            })

        }
        catch (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                enumError: 0
            })
        }
    }

    // [POST] /send/email
    async sendEmail(req, res) {
        const email = req.body.email

        if (!email) return res.status(202).json({
            success: false,
            message: 'Missing email',
            enumError: 1
        })

        try {
            const user = await User.findOne({ email: email })
            if (!user) {
                return res.status(202).json({
                    success: false,
                    message: 'Email not found',
                    enumError: 2
                })
            }

            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                },
                tls: {
                    rejectUnauthorized: false,
                }
            })

            let mailOptions = {
                from: "onoff.dev123@gmail.com",
                to: email,
                subject: "Testing",
                subject: "Please confirm your account",
                html: `<h1>Email Confirmation</h1>
                        <h2>Hello ${user.name}</h2>
                        <p>Click the link to change your password</p>
                        <a href="https://onoff-dev.netlify.app/reset/password/${user.confirmationCode}"> Click here</a>`
            }

            transporter.sendMail(mailOptions, function (err, success) {
                if (err) {
                    console.log(err);
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "Email sent successfully"
                    })
                }
            })
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                enumError: 0
            })
        }
    }

    // [PUT] /reset/password
    async resetPassword(req, res) {
        const { confirmationCode, password, rePassword } = req.body

        if(!password || !rePassword || !confirmationCode) {
            return res.status(202).json({
                success: false,
                message: 'Missing param',
                enumError: 1
            })
        }

        try {
            const user = await User.findOne({ confirmationCode: req.body.confirmationCode })

            if(!user) {
                return res.status(202).json({
                    success: false,
                    message: "User node not found",
                    enumError: 2
                })
            }
            

            if (rePassword.length < 6) {
                return res.status(202).json({
                    success: false,
                    message: 'Password length is too short',
                    enumError: 3
                })
            }

            if (req.body.password !== rePassword) return res.status(202).json({
                success: false,
                message: 'Password does not match',
                enumError: 4
            })

            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(rePassword, salt)

            const newUser = await User.findOneAndUpdate(
                {
                    _id: user._id
                },
                {
                    password: hashedPass
                },
                {
                    returnDocument: 'after'
                }
            )

            const { password, isAdmin, confirmationCode, ...info } = newUser._doc

            return res.status(200).json({
                success: true,
                user: info
            })

        }
        catch (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                enumError: 0
            })
        }
    }
}

module.exports = new AuthController()