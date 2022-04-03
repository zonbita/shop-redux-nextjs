import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import style from './detailProduct.module.scss'
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import NewProduct from '../../components/newProduct/NewProduct';
import Notify from '../../components/notify/Notify';
import { parsePriceToString } from '../../util/index';
import { userSelector, tokenSelector } from '../../features/selector'
import cartSlice from '../../features/carts/cartSlice';

const Detailproduct = () => {

    const user = useSelector(userSelector)
    const token = useSelector(tokenSelector)

    const [product, setProduct] = useState({})
    const [newProduct, setNewProduct] = useState()

    const [color, setColor] = useState([])
    const [img, setImg] = useState('')
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)

    const { slug } = useParams()

    const dispatch = useDispatch()

    const handleChangeAmount = async (n) => {
        if (quantity === 1 && n === -1) {
            setQuantity(1)
        }
        else {
            setQuantity(quantity + n)
        }
    }

    const handleAddtToCard = async () => {
        const cart = JSON.parse(localStorage.getItem('cart'))
            ? JSON.parse(localStorage.getItem('cart'))
            : []

        const index = cart.findIndex(item => {
            return item.productId === product._id
        })

        if (index === -1) {
            cart.push({
                productId: product._id,
                quantity: quantity,
                color: color,
                size: size
            })

            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch(cartSlice.actions.addToCart(cart))
        }
        else {
            cart[index].quantity += quantity
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch(cartSlice.actions.addToCart(cart))
        }
        if (user) {
            const data = {
                quantity: quantity,
                color: color,
                size: size
            }

            const res = await axios.post(`${process.env.URL}/api/cart/add/${product._id}`, data, {
                headers: {
                    token: token
                }
            })

            dispatch(cartSlice.actions.addToCart(res.data.cart.products))
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)

        const fetchProduct = async () => {
            const res = await axios.get(`${process.env.URL}/api/product/${slug}`)
            setProduct(res.data.product)
            setImg(res.data.product.img[0])
            setColor(res.data.product.color[0])
            setSize(res.data.product.size[0])
        }

        const fetchProducts = async () => {
            const res = await axios.get(`${process.env.URL}/api/product?_category=tre-em&_page=1&_limit=5`)

            setNewProduct(res.data.products)
        }

        fetchProducts()
        fetchProduct()
    }, [slug])

    return (
        <>
            <Header />
            <Notify />
            <div className={style.detailProduct}>
                <div className={style.wrapper}>
                    <div className={style.imgProduct}>
                        <div className={style.detailImg}>
                            {
                                product.img && product.img.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={style.imgItem}
                                            onClick={() => setImg(item)}
                                        >
                                            <img
                                                src={item}
                                                alt=""
                                            />
                                        </div>
                                    )

                                })
                            }
                        </div>
                        <div className={style.bigImg}>
                            <img
                                src={product.img && img}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={style.infoProduct}>
                        <div className={style.nameProduct}>
                            {product.title}
                        </div>
                        <div className={style.detailInfo}>
                            <span>{product.code}</span>
                            <span>Đã bán {product.sale}</span>
                        </div>
                        <div className={style.price}>
                            {parsePriceToString(product.price)}đ
                        </div>
                        <div className={style.options}>
                            <div className={style.color}>
                                <div className={style.nameColor}>
                                    <span>MÀU SẮC:</span>
                                    <span>{color}</span>
                                </div>
                                <div className={style.detailColor}>
                                    {
                                        product.img && product.img.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={style.colorItem}
                                                    onClick={() => {
                                                        setImg(item)
                                                        setColor(product.color[index])
                                                    }}
                                                >
                                                    <img
                                                        src={item}
                                                        alt=""
                                                    />
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            </div>
                            <div className={style.size}>
                                <div className={style.name}>
                                    <span>KÍCH CỠ:</span>
                                    <span>{size}</span>
                                </div>
                                <div className={style.detailSize}>
                                    {
                                        product.size && product.size.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={style.sizeItem}
                                                    onClick={() => setSize(item)}
                                                >
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={style.amount}>
                                <div className={style.name}>
                                    SỐ LƯỢNG:
                                </div>
                                <div className={style.buttonAmount}>
                                    <span
                                        onClick={() => handleChangeAmount(-1)}
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </span>
                                    <span>{quantity}</span>
                                    <span
                                        onClick={() => handleChangeAmount(1)}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </span>
                                </div>
                            </div>

                            <div className={style.order}>
                                <div
                                    className={style.addToCard}
                                    onClick={handleAddtToCard}
                                >
                                    THÊM VÀO GIỎ HÀNG
                                </div>
                                <div className={style.store}>
                                    TÌM TẠI CỬA HÀNG
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NewProduct products={newProduct} title="SẢN PHẨM MỚI" />
            <Footer />
        </>
    );
}

export default Detailproduct;
