import { useSelector, useDispatch } from 'react-redux'
import {  Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';

import InvoiceProduct from '../../components/invoiceProduct/InvoiceProduct';
import style from './order.module.scss'
import { tokenSelector, userSelector } from '../../features/selector'
import { parsePriceToString } from '../../util/index'
import invoiceSlice from '../../features/invoices/invoiceSlice';

const Order = () => {
    const token = useSelector(tokenSelector)
    const user = useSelector(userSelector)
    const [total, setTotal] = useState(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [products, setProducts] = useState([])

    const [name, setName] = useState(user.name)
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [wards, setWards] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState(user.email)
    const [note, setNote] = useState('')

    const handleOrder = async () => {
        const data = {
            name: name,
            province: province,
            district: district,
            wards: wards,
            address: address,
            phone: phone,
            email: email,
            note: note
        }

        if(name && province && district && wards && address && phone && email && note) {
            // api create invoice
            const res = await axios.post(`${process.env.URL}/api/invoice/create`, data, {
                headers: {
                    token: token
                }
            })

            localStorage.setItem('invoice', JSON.stringify(res.data))
            dispatch(invoiceSlice.actions.addInvoice(res.data))
            navigate('/invoice')
        }
        else {
            alert("Điền đủ thông tin")
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0)
        
        const fetchProducts = async () => {
            const res = await axios.get(`${process.env.URL}/api/cart/product`, {
                headers: {
                    token: token
                }
            })
            setProducts(res.data.cart.products)
        }
        
        const fetchTotal = async () => {
            // api total
            const res = await axios.get(`${process.env.URL}/api/cart/total`, {
                headers: {
                    token: token
                }
            })
            setTotal(res.data.total)
        }

        fetchProducts()
        fetchTotal()
    }, [token])

    return (
        <div className={style.order}>
            <span className={style.pay}>ĐẶT HÀNG VÀ THANH TOÁN</span>
            <span className={style.previous}>Click vào <Link style={{color: 'red'}} className="link" to="/">đây</Link> để tiếp tục mua sắm</span>
            <div className={style.container}>
                <div className={style.infoProduct}>
                    <span className={style.title}>
                        THÔNG TIN ĐƠN HÀNG
                    </span>
                    <div className={style.wrapper}>
                        {
                            products && products.map((product, index) => {
                                return (
                                    <InvoiceProduct 
                                        key={index}
                                        product={product}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                <div className={style.address}>
                    <span className={style.title}>
                        ĐỊA CHỈ NHẬN HÀNG
                    </span>

                    <div className={style.wrapper}>
                        <div className={style.name}>
                            <span>Họ tên</span>
                            <input 
                                type="text" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className={style.location}>
                            <div className={style.province}>
                                <span>Tỉnh/Thành</span>
                                <input 
                                    type="text" 
                                    value={province}
                                    onChange={e => setProvince(e.target.value)}
                                />
                            </div>

                            <div className={style.district}>
                                <span>Quận/Huyện</span>
                                <input 
                                    type="text" 
                                    value={district}
                                    onChange={e => setDistrict(e.target.value)}
                                />
                            </div>
                        </div>

                        
                        <div className={style.wards}>
                                <span>Phường/Xã</span>
                                <input 
                                    type="text" 
                                    value={wards}
                                    onChange={e => setWards(e.target.value)}
                                />
                        </div>

                        <div className={style.detailAddress}>
                            <span>Địa chỉ</span>
                            <input 
                                type="text" 
                                value={address} 
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>

                        <div className={style.telephone}>
                            <span>Số điện thoại</span>
                            <input 
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)} 
                            />
                        </div>

                        <div className={style.email}>
                            <span>Email</span>
                            <input 
                                type="email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={style.note}>
                            <span>Ghi chú</span>
                            <input 
                                type="text" 
                                value={note}
                                onChange={e => setNote(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={style.payment}>
                    <span className={style.title}>
                        THANH TOÁN
                    </span>

                    <div className={style.wrapper}>
                        <div className={style.voucher}>
                            <input 
                                type="text" 
                                placeholder="Nhập mã giảm giá"
                            />
                            <span>Áp dụng</span>
                        </div>

                        <div className={style.total}>
                            <div className={style.totalProduct}>
                                <span>Tổng tiền hàng</span>
                                <span>{parsePriceToString(total)}đ</span>
                            </div>
                            <div className={style.fee}>
                                <span>Phí vận chuyển</span>
                                <span>20.000đ</span>
                            </div>
                            <div className={style.money}>
                                <span>Thành tiền sau triết khấu</span>
                                <span>{parsePriceToString(Number(total) + 30000)}đ</span>
                            </div>
                        </div>

                            <div onClick={handleOrder} className={style.orderNow}>
                                ĐẶT HÀNG NGAY
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
