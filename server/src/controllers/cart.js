const Cart = require('../model/Cart')

class CartController {
    // [GET] /
    async createCart(req, res) {
        const userId = req.body.userId

        const cartClient = req.body.cartClient

        try {
            let cart = await Cart.findOne({ userId: userId })

            if(!cart) {
                if(cartClient) {
                    cart = new Cart({
                        userId,
                        products: cartClient
                    })
                }
                else {
                    cart = new Cart({
                        userId,
                        products: []
                    })
                }

                await cart.save()

                cart = await Cart.findOne({ userId: userId })
            }

            return res.status(200).json({
                success: true,
                message: "Find cart successfully",
                cart: cart
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    } 

    // [GET] /:id
    async getCartById(req, res) {

        const userId = req.body.userId

        if(!userId) return res.status(400).json({
            success: false,
            message: "Mising param",
            enumError: 1
        })

        try {
            const cart = await Cart.findOne({ userId: userId })

            if(!cart) return res.status(400).json({
                success: false,
                message: "Cart not found",
                enumError: 2
            })

            return res.status(200).json({
                success: true,
                message: "Cart successfully successfully",
                cart: cart
            })
        }
        catch(err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [POST] /add/:id
    async addToCart(req, res) {
        const productId = req.params.id
        const {userId, quantity, color, size} = req.body

        try {
            const cart = await Cart.findOne({ userId: userId }) 

            if(!cart) return res.status(400).json({
                success: false,
                message: "Cart not found",
                enumError: 1
            })

            const index = cart.products.findIndex(product => {
                return product.productId.toString() === productId
            })

            if(index === -1) {
                cart.products.push({ 
                    productId: productId,
                    quantity: quantity,
                    color: color,
                    size: size
                })
            }
            else {
                cart.products[index].quantity += quantity
            }

            const newCart = await cart.save()

            if(!cart) return res.status(400).json({
                success: false,
                message: "Err",
                enumError: 2,
            })

            return res.status(200).json({
                success: true,
                message: "Add product to cart successfully",
                cart: newCart
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [PUT] /plus/:id
    async plusProduct(req, res) {
        const userId = req.body.userId
        const productId = req.params.id

        if(!productId || !userId) return res.status(400).json({
            success: false,
            message: "Missing param",
            enumError: 1
        })
        
        try {
            const cart = await Cart.findOne({ userId: userId })

            if(!cart) {
                return res.status(400).json({
                    success: false,
                    message: "Cart not found",
                    enumError: 2
                })
            }

            const index = cart.products.findIndex(product => {
                return product.productId.toString() === productId
            })

            if(index === -1) return res.status(400).json({
                success: false,
                message: 'Product not found',
                enumError: 3
            })

            cart.products[index].quantity += 1

            const newProduct = await cart.save()

            return res.status(200).json({
                success: true,
                message: "Plus product successfully",
                productId: newProduct
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [PUT] /minus/:id
    async minusProduct(req, res) {
        const userId = req.body.userId
        const productId = req.params.id

        if(!productId || !userId) return res.status(400).json({
            success: false,
            message: "Missing param",
            enumError: 1
        })
        
        try {
            const cart = await Cart.findOne({ userId: userId })

            if(!cart) {
                return res.status(400).json({
                    success: false,
                    message: "Cart not found",
                    enumError: 2
                })
            }

            const index = cart.products.findIndex(product => {
                return product.productId.toString() === productId
            })

            if(index === -1) return res.status(400).json({
                success: false,
                message: 'Product not found',
                enumError: 3
            })


            if(cart.products[index].quantity > 1) {
                cart.products[index].quantity -= 1
            }

            const newProduct = await cart.save()

            return res.status(200).json({
                success: true,
                message: "Minus product successfully",
                productId: newProduct
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [DELETE] /delete/:in
    async deleteProduct(req, res) {
        const userId = req.body.userId
        const productId = req.params.id

        if(!productId || !userId) return res.status(400).json({
            success: false,
            message: "Missing param",
            enumError: 1
        })

        try {
            const newCart = await Cart.findOneAndUpdate({ userId: userId }, {
                $pull: {
                    products: {
                        productId: productId
                    }
                }
            }, { returnDocument: 'after' }).populate({
                path: 'products.productId'
            })
            
            return res.status(200).json({
                success: true,
                message: "Delete productId successfully",
                cart: newCart
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [DELTE] /reset
    async resetCart(req, res) {
        const { userId } = req.body

        try {
            await Cart.findOneAndUpdate({ userId: userId }, { products: []})
            return res.status(200).json({ 
                success: true,
                message: "Reset cart successfully"
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [GET] /total
    async getTotal(req, res) {
        const userId = req.body.userId

        try {
            const cart = await Cart
                                .findOne({ userId: userId })
                                .populate({
                                    path: 'products.productId'
                                })

            let total = cart.products.reduce((prev, product) => {
                return prev += product.productId.price * product.quantity;
            }, 0)

            
                               
            return res.status(200).json({
                success: true,
                message: 'Success',
                total: total
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }
}

module.exports = new CartController()