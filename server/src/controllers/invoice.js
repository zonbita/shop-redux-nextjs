const Invoice = require('../model/Invoice')
const Cart = require('../model/Cart')

class InvoiceController {
    // [POST] /create
    async createInvoice(req, res) {
        const userId = req.body.userId

        const {name, province, district, wards, 
                address, phone, email, note} = req.body

        if(!name || !province || !district || !wards ||
            !address || !phone || !email || !note || !userId) {
                return res.status(400).json({ 
                    success: false,
                    message: "Missing param",
                    enumError: 1
                })
            }

        try {
            const cart = await Cart
                .findOne({ userId: userId })
                .populate({
                    path: 'products.productId'
                })

            if(!cart) {
                return res.status(400).json({ 
                    success: false,
                    message: "Cart not found",
                    enumError: 2,
                })
            }

            const invoice = new Invoice({
                userId: userId,
                cartId: cart._id,
                name, 
                province, 
                district, 
                wards, 
                address, 
                phone, 
                email, 
                note
            })

            const newInvoice = await invoice.save()

            return res.status(200).json({
                success: true,
                message: 'Invoice saved successfully',
                invoice: newInvoice,
                cart: cart
            })
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ 
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [GET] /:id
    async getInvoiceById(req, res) {
        const userId = req.body.userId
        const invoieId = req.params.id 

        if(!userId || !invoieId) {
            return res.status(400).json({
                success: false,
                message: "Missing param",
                enumError: 1
            })
        }

        try {
            const invoice = await Invoice
                .findOne({ _id: invoieId, userId: userId})

            if(!invoice) {
                return res.status(400).json({
                    success: false,
                    message: "Invoice does exist",
                    enumError: 2
                })
            }

            return res.status(200).json({
                success: true,
                message: "Find invoice successfully",
                invoice: invoice
            })
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ 
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [GET] /user
    async getAllInvoice(req, res) {
        const userId = req.body.userId

        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "Missing param",
                enumError: 1
            })
        }

        try {
            const invoice = await Invoice.find({userId: userId})

            if(!invoice) {
                return res.status(400).json({
                    success: false,
                    message: "Invoice does exist",
                    enumError: 2
                })
            }

            return res.status(200).json({
                success: true,
                message: "Find invoice successfully",
                invoice: invoice
            })
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ 
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }
} 

module.exports = new InvoiceController()