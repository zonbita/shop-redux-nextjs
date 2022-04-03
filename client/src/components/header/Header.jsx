import { useRef, useEffect, memo } from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

import style from './header.module.scss'
import Productcart from '../productCart/ProductCart'
import { productCartSelector, tokenSelector, totalSelector } from '../../features/selector'
import cartSlice from '../../features/carts/cartSlice'
import { toSlug } from '../../util/index'
import { parsePriceToString } from '../../util/index'

const Header = () => {
    const dispatch = useDispatch()

    const productCart = useSelector(productCartSelector)
    const token = useSelector(tokenSelector)
    const total = useSelector(totalSelector)

    const menuRef = useRef()
    const iconRef = useRef()
    const totalRef = useRef()

    const [search, setSearch] = useState('')

    const backgroundOrderRef = useRef()
    const mainRef = useRef()

    const [count, setCount] = useState(() => {
        return productCart.length
    })

    const handleExitOrder = () => {
        mainRef.current.style.display = 'none'
    }

    const handleDisplayCard = () => {
        mainRef.current.style.display = 'block'
    }

    const handleMenu = () => {
        if (menuRef.current.style.display === 'none' ||
            menuRef.current.style.display === '') {
            menuRef.current.style.display = 'block'
            iconRef.current.className = 'fa-solid fa-chevron-left'
        }
        else {
            menuRef.current.style.display = 'none'
            iconRef.current.className = 'fa-solid fa-bars'
        }
    }  

    const handleSearch = () => {
        if(search) {
            const slug = toSlug(search)
            window.location.href = `${process.env.URL}/products/search/${slug}`
        }
    }

    useEffect(() => {
        if(token) {
            totalRef.current.style.opacity = '1'
            
            const fetchTotal = async () => {
                const res = await axios.get(`${process.env.URL}/api/cart/total`, {
                    headers: {
                        token: token
                    }
                })
                dispatch(cartSlice.actions.totalProduct(res.data.total))
            }
            fetchTotal()
        }

        setCount(productCart.length)

        return () => {}
    }, [productCart, token, dispatch])

    return (
        <>
            {/* Header */}
            <div className={style.header}>
                <div className={style.container}>
                    <div className={style.left}>
                        <div
                            className={style.menu}
                            onClick={handleMenu}
                        >
                            <i
                                className="fa-solid fa-bars"
                                ref={iconRef}
                            >

                            </i>

                            <div
                                className={style.listResp}
                                ref={menuRef}
                            >
                                <div className={style.collectItem}>
                                <Link className="link" to="/products/nam"><span>NAM</span></Link>
                                    <Link className="link" to="/products/nu"><span>NỮ</span></Link>
                                    <Link className="link" to="/products/tre-em"><span>TRẺ EM</span></Link>
                                    <span>BỘ SƯU TẬP</span>
                                    <span>END OF SEASON SALE</span>
                                </div>
                                <div className={style.option}>
                                    <Link className="link" to="/"><i className="fa-solid fa-house-chimney"></i></Link>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <Link className="link" to="/customer/account"><i className="fa-solid fa-user"></i></Link>
                                </div>
                            </div>
                        </div>
                        <Link className="link" to="/">
                            <img src="https://onoff.vn/static/version1644799883/frontend/Of/default/en_US/images/logo.svg" alt="" />
                        </Link>
                        <div className={style.list}>
                            <Link className="link" to="/products/nam"><span>NAM</span></Link>
                            <Link className="link" to="/products/nu"><span>NỮ</span></Link>
                            <Link className="link" to="/products/tre-em"><span>TRẺ EM</span></Link>
                            <Link className="link" to="/products/all"><span>BỘ SƯU TẬP</span></Link>
                            <span>END OF SEASON SALE</span>
                        </div>
                        <div onClick={handleDisplayCard} className={style.cart}>
                            <i className="icon fa-solid fa-cart-shopping"></i>
                            <div className={style.count}>{count}</div>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.search}>
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSearch()}
                            />
                            <div onClick={handleSearch} className={style.iconSearch}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <div className={style.listIcon}>
                            <i className="icon fa-solid fa-location-dot"></i>
                            <Link className="link" to="/customer/account"><i className="icon fa-solid fa-user-large"></i></Link>
                            <i onClick={handleDisplayCard} className="icon fa-solid fa-cart-shopping"></i>
                            <div className={style.count}>{count}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart */}
            <div
                className={style.cartProducts}
                ref={mainRef}
            >
                <div
                    className={style.backgroundOrder}
                    onClick={handleExitOrder}
                    ref={backgroundOrderRef}
                >

                </div>
                <span className={style.title}>
                    GIỎ HÀNG CỦA BẠN

                    <div
                        className={style.exitIcon}
                        onClick={handleExitOrder}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </span>
                <div className={style.products}>
                    {
                        productCart && productCart.map((product, index) => 
                            <Productcart
                                key={index}  
                                product={product}
                            />
                        )
                    }
                </div>

                <div className={style.total}>
                    <div ref={totalRef} className={style.sumProducts}>
                        <span>Tổng tiền</span>
                        <span>{parsePriceToString(total)}đ</span>
                    </div>
                    <div className={style.order}>
                        <Link className="link" to="/order"><span>ĐẶT HÀNG</span></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(Header);
