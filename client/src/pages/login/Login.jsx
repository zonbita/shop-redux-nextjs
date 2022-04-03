import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import Notify from '../../components/notify/Notify'
import userSlice from '../../features/users/userSlice'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import style from './login.module.scss'
import cartSlice from '../../features/carts/cartSlice'


const Login = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState()

    const statusRef = useRef()

    const handleLogin = async () => {
        if(!email || !password) {
            statusRef.current.innerHTML = 'Vui lòng điền đầy đủ thông tin'
        }
        else {
            // login
            const res = await axios.post(`${process.env.URL}/api/auth/login`, {
                email: email,
                password: password
            })

            setStatus(res.data.enumError)

            if(res.data.success) {
                // create cart to localStorage
                const data = JSON.parse(localStorage.getItem('cart')) 
                                ? JSON.parse(localStorage.getItem('cart')) : []
                
                await axios.post(`${process.env.URL}/api/cart/`, {cartClient: data}, {
                    headers: {
                        token: res.data.accessToken.toString()
                    }
                })

                // get product to database
                const cart = await axios.get(`${process.env.URL}/api/cart/product`, {
                    headers: {
                        token: res.data.accessToken.toString()
                    }
                })

                dispatch(cartSlice.actions.addToCart(cart.data.cart.products))

                localStorage.setItem('user', JSON.stringify(res.data.info))
                localStorage.setItem('token', JSON.stringify(res.data.accessToken))
                localStorage.setItem('cart', JSON.stringify(cart.data.cart.products))
                dispatch(userSlice.actions.login(res.data))
                navigate('/')
            }
        }
    }

    useEffect(() => {
        if(status === 1) {
            statusRef.current.innerHTML = 'Vui lòng điền đầy đủ thông tin'
        }
        else if(status === 2) {
            statusRef.current.innerHTML = 'Mật khẩu tối thiểu 6 ký tự'
        }
        else if(status === 3) {
            statusRef.current.innerHTML = 'Thông tin tài khoản không chính xác'
        }
        else if(status === 4) {
            statusRef.current.innerHTML = 'Mật khẩu không chính xác'
        }

        return () => {}
    }, [status])

    return (
        <>
            <Header />
            <Notify />
            <div className={style.login}>
                <div className={style.title}>
                    TÀI KHOẢN
                </div>
                <div className={style.wrapper}>
                    <div className={style.account}>
                        <span className={style.custom}>Khách hàng đã đăng kí tài khoản</span>
                        <span>Bạn đã có tài khoản, xin mời đăng nhập bằng địa chỉ email đăng ký.</span>

                        <div className={style.inputButton}>
                            <span>Email</span>
                            <input 
                                type="text" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={style.inputButton}>
                            <span>Password</span>
                            <input 
                                type="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleLogin()}
                            />
                        </div>
                        <div className={style.status} ref={statusRef}></div>
                        <div className={style.loginButton}>
                            <span onClick={handleLogin}>Đăng nhập</span>
                            <span>Quên mật khẩu</span>
                        </div>
                    </div>
                    <div className={style.register}>
                        <span>Khách hàng mới</span>
                        <div className={style.registerButton}>
                            <Link className="link" to="/register">Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
