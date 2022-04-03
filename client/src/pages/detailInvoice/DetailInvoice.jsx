import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Header from '../../components/header/Header'
import Notify from '../../components/notify/Notify'
import Footer from '../../components/footer/Footer'
import style from './detailInvoice.module.scss'
import { tokenSelector } from '../../features/selector'
import { parsePriceToString } from '../../util/index'

export default function DetailInvoice() {

    const dispatch = useDispatch()

    const token = useSelector(tokenSelector)
    const invoice = JSON.parse(localStorage.getItem('invoice'))

    const [total, setTotal] = useState()

    useEffect(() => {
        window.scrollTo(0, 0)
        
        const fetchTotal = async () => {
            const res = await axios.get(`${process.env.URL}/api/cart/total`, {
                headers: {
                    token: token
                }
            })
            setTotal(res.data.total)
        }
        
        // const fetchResetCart = async () => {
        //     await axios.delete('http://localhost:5000/api/cart/reset', {
        //         headers: {
        //             token: "Bearer " + token
        //         }
        //     })
        // }
        
        fetchTotal()
    }, [token, dispatch])

    return (
        <>
            <Header />
            <Notify />
            <div className={style.detailInvoice}>
                <div className={style.order}>
                    <span className={style.title}>
                        CHI TIẾT HOÁ ĐƠN
                    </span>

                    <div className={style.product}>
                        <span>SẢN PHẨM</span>
                        <span>TỔNG</span>
                    </div>

                    <div className={style.listProduct}>
                        {
                            invoice && invoice.cart.products.map((product, index) => {
                                return (
                                    <div 
                                        key={index}
                                        className={style.productItem}
                                    >
                                        <span>{product.productId.title} x {product.quantity}</span>
                                        <span>{parsePriceToString(Number(product.productId.price) * Number(product.quantity))}đ</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={style.wrapper}>
                        <div className={style.fee}>
                            <span>Phí giao hàng:</span>
                            <span>30.000đ</span>
                        </div>


                        <div className={style.fee}>
                            <span>Tổng tiền:</span>
                            <span>{parsePriceToString(Number(total) + 30000)}đ</span>
                        </div>
                    </div>
                </div>

                <div className={style.invoice}>
                    <div className={style.note}>
                        <span>ĐẶT HÀNG THÀNH CÔNG</span>
                    </div>
                    <div className={style.infoInvoice}>
                        <span>Mã đơn hàng: {invoice.invoice._id}</span>
                        <span>Ngày: {invoice.invoice.updatedAt}</span>
                        <span>Người nhận hàng: {invoice.invoice.name}</span>
                        <span>Địa chỉ: {invoice.invoice.address}</span>
                        <span>Tổng tiền: {parsePriceToString(Number(total) + 30000)}đ</span>
                        <span>Phương thức thanh toán: Ship COD</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
