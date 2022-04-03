import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import style from './productCart.module.scss'
import { tokenSelector, productCartSelector } from '../../features/selector';
import cartSlice from '../../features/carts/cartSlice' 
import { parsePriceToString } from '../../util/index'

const Productcart = ({ product }) => {

    const dispatch = useDispatch()

    const token = useSelector(tokenSelector)
    const productToCart = useSelector(productCartSelector)

    const [productCart, setProductCart] = useState({})

    const [amount, setAmount] = useState(1)

    const handleChangeAmount = async (n) => {
        if (amount === 1 && n === -1) {
            setAmount(1)
        }
        else {
            setAmount(amount + n)
        }

        if(token) {
            const cart = JSON.parse(localStorage.getItem('cart'))

            const index = cart.findIndex(item => {
                return item.productId === product.productId
            })

            const data = {}

            if(n === 1) {
                cart[index].quantity ++
                localStorage.setItem('cart', JSON.stringify(cart))
                await axios.put(`${process.env.URL}/api/cart/plus/${product.productId}`, data, {
                    headers: {
                        token: token
                    }
                })
                
                const res = await axios.get(`${process.env.URL}/api/cart/total`, {
                        headers: {
                        token: token
                    }
                })
                dispatch(cartSlice.actions.totalProduct(res.data.total))
            }
            else if(n === -1 && amount >= 1) {
                cart[index].quantity --
                localStorage.setItem('cart', JSON.stringify(cart))
                await axios.put(`${process.env.URL}/api/cart/minus/${product.productId}`, data, {
                    headers: {
                        token: token
                    }
                })

                const res = await axios.get(`${process.env.URL}/api/cart/total`, {
                        headers: {
                        token: token
                    }
                })
                dispatch(cartSlice.actions.totalProduct(res.data.total))
            }
        }
    }

    const handleRemove = async () => {
        const products = productToCart.filter((item) => {
            return item.productId !== product.productId
        })

        localStorage.setItem('cart', JSON.stringify(products))

        dispatch(cartSlice.actions.removeCart(products))

        if(token) {
            await axios.delete(`${process.env.URL}/api/cart/delete/${product.productId}`, {
                headers: {
                    token: token
                }
            })
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`${process.env.URL}/api/product/find/${product.productId}`)
            setProductCart(res.data.product)
        }
        fetchProduct()
        setAmount(product.quantity)
        return () => {}
    }, [product.productId, product.quantity])

    return (
        <div className={style.productItem}>
            <div className={style.imgItem}>
                {
                    Object.entries(productCart).length !== 0 && 
                    <img
                        src={productCart.img[0]}
                        alt=""
                    />
                }
            </div>
            <div className={style.infoProduct}>
                <div className={style.infoDetail}>
                    <span><Link className="link" to="/:slug">{productCart.title}</Link></span>
                    <span>{parsePriceToString(productCart.price)}đ</span>
                    <span>{product.color}</span>
                </div>

                <div className={style.amount}>
                    <span className={style.amountTitle}>SỐ LƯỢNG</span>
                    <div className={style.amountWrapper}>
                        <span
                            onClick={() => handleChangeAmount(-1)}
                        >
                            <i className="fa-solid fa-minus"></i>
                        </span>
                        <span>{amount}</span>
                        <span
                            onClick={() => handleChangeAmount(1)}
                        >
                            <i className="fa-solid fa-plus"></i>
                        </span>
                    </div>
                    <div 
                        className={style.delIcon}
                        onClick={handleRemove}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Productcart);
