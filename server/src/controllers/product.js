const Product = require('../model/Product')

class ProductController {
    // [POST] /create
    async createProduct(req, res) {
        const {
            title, category, code, price, material, 
            color, size, quantity,  sale, img
        } = req.body

        if(!title || !category || !code || !price || !material || 
            !color || !size || !quantity || !sale || !img) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                    enumError: 1
                })
        }

        try {
            const checkTitle = await Product.findOne({ title: req.body.title })

            if(checkTitle) {
                return res.status(400).json({
                    success: false,
                    message: "Title is already in use",
                    enumError: 2
                })
            }

            const product = new Product({ 
                title: req.body.title,
                category: category, 
                code: code, 
                price: price, 
                color: color, 
                size: size, 
                quantity: quantity,  
                sale: sale, 
                img: img,
                material: material,
            })

            const newProduct = await product.save()

            return res.status(200).json({
                success: true,
                message: "Create product successfully",
                product: newProduct
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

    // [GET] :/slug
    async getProduct(req, res) {
        const slug = req.params.slug

        if(!slug) return res.status(400).json({
            success: false,
            message: "Missing required parameter",
            enumError: 1
        })

        try {
            const product = await Product.findOne({ slug: slug })

            if(!product) return res.status(400).json({
                success: false,
                message: "Product not found",
                enumError: 2
            })

            return res.status(200).json({
                success: true,
                message: "Find product successfully",
                product: product
            })
        }
        catch(err) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [GET] product/:id
    async getProductById(req, res) {
        const id = req.params.id

        if(!id) return res.status(400).json({
            success: false,
            message: "Missing required parameter",
            enumError: 1
        })

        try {
            const product = await Product.findById({ _id: id })

            if(!product) return res.status(400).json({
                success: false,
                message: "Product not found",
                enumError: 2
            })

            return res.status(200).json({
                success: true,
                message: "Find product successfully",
                product: product
            })
        }
        catch(err) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [GET] /
    async getSomeProduct(req, res) {
        const query = req.query

        let page = query._page && Number(query._page) || 1
        let limit = query._limit && Number(query._limit) || 24
        let sort = query._sort
        let order = query._order // asc, desc
        
        // all query
        const queryObj = {}
        let sortObj = {}

        queryObj.category = query._category
        queryObj.color = query._color
        queryObj.size = query._size
        queryObj.material = query._material
        queryObj.price = query._price
        queryObj.slug = query._slug

        if(sort && order) {
            sortObj = { 
                [sort]: order 
            }
        }

        let newQuery = {}

        for(const key in queryObj) {
            if(queryObj[key]) {
                newQuery = {...newQuery, [key]: queryObj[key]}
            }
        }

        try {
            let products = []
            let maxPrice = (await Product.findOne().sort({ price: 'desc'}).exec()).price
            let minPrice = (await Product.findOne().sort({ price: 'asc'}).exec()).price

            // Pagination
            let totalProduct = await Product.countDocuments({ ...newQuery })

            let pagination = {
                current: page > Math.ceil(totalProduct / limit) ? 1 : page,
                limit: limit,
                total: Math.ceil(totalProduct / limit)
            }

            if(page > pagination.total) page = 1

            const startIndex = Number((page - 1) * limit)

            products = await Product
                .find(newQuery)
                .sort(sortObj)
                .skip(startIndex)
                .limit(limit)

            return res.status(200).json({
                success: true,
                pagination: pagination,
                minPrice: minPrice,
                maxPrice: maxPrice,
                products: products,
            })
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }

    }

    // [GET] /search
    async searchProduct(req, res) {
        console.log(1);
        const search = req.query.s
        console.log(req.query);
        if(!search) return res.status(400).json({
            success: false,
            message: 'Missing query',
            enumError: 1
        })

        try {
            const products = await Product
                .find({ slug: { $regex: '.*' + search + '.*' }})
                .limit(24)  
            
            return res.status(200).json({
                success: true,
                message: 'Find product was successfully',
                products: products
            })
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                enumError: 0
            })
        }
    }

    // [DELETE] /delete/:_id
    async deleteProduct(req, res) {
        const id = req.params.id
        if(!id) return res.status(400).json({
            success: false,
            message: 'Missing query',
            enumError: 1
        })

        try {
            await Product.deleteOne({_id: id})

            return res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
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

    // [PUT] /updates/:id
    async updateProduct(req, res) {
        const id = req.params.id

        if(!id) return res.status(400).json({
            success: false,
            message: 'Missing query',
            enumError: 1
        })

        try {
            const newProduct = await Product.findOneAndUpdate(
                { 
                    _id: id 
                },
                req.body,
                {
                    returnDocument: 'after'
                }
            )

            if(!newProduct) return res.status(400).json({
                success: false,
                message: 'Product not found',
                enumError: 1
            })

            return res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                product: newProduct
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

module.exports = new ProductController()