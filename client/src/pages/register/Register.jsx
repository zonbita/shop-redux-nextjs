import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Header from '../../components/header/Header'
import Notify from '../../components/notify/Notify'
import Footer from '../../components/footer/Footer'
import style from './register.module.scss'

import { useEffect, useRef, useState } from 'react'

const Register = () => {

    const navigate = useNavigate()

    const statusRef = useRef()

    const [surName, setSurName] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [status, setStatus] = useState()

    const handleRegister = async () => {
        if (!surName || !name || !email || !password || !rePassword) {
            statusRef.current.innerHTML = 'Vui lòng điền đầy đủ thông tin'
        }
        else {
            const res = await axios.post(`${process.env.URL}/api/auth/register`, {
                surname: surName,
                name: name,
                email: email,
                password: password,
                rePassword: rePassword
            })

            setStatus(res.data.enumError)

            if (res.data.success) {
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        if(status === 1) {
            statusRef.current.innerHTML = 'Mật khẩu không trùng khớp'
        }
        else if(status === 2) {
            statusRef.current.innerHTML = 'Mật khẩu tối thiểu 6 ký tự'
        }
        else if(status === 3) {
            statusRef.current.innerHTML = 'Vui lòng điền đầy đủ thông tin'
        }
        else if(status === 4) {
            statusRef.current.innerHTML = 'Địa chỉ email đã tồn tại'
        }
    }, [status])

    return (
        <>
            <Header />
            <Notify />
            <div className={style.register}>
                <div className={style.title}>TẠO TÀI KHOẢN MỚI</div>
                <div className={style.wrapper}>
                    <div className={style.account}>
                        <span className={style.custom}>Thông tin khách hàng</span>

                        <div className={style.info}>
                            <div className={style.inputButton}>
                                <span>Tên</span>
                                <input
                                    type="text"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className={style.inputButton}>
                                <span>Họ</span>
                                <input
                                    type="text"
                                    value={surName}
                                    onChange={e => setSurName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={style.infoLogin}>
                            <span className={style.custom}>Thông tin đăng nhập</span>
                            <div className={style.inputButton}>
                                <span>Email</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={style.inputButton}>
                                <span>Mật khẩu</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className={style.inputButton}>
                                <span>Nhập lại mật khẩu</span>
                                <input
                                    type="password"
                                    value={rePassword}
                                    onChange={e => setRePassword(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && handleRegister()}
                                />
                            </div>
                            <div className={style.status} ref={statusRef}></div>
                        </div>
                        <div
                            className={style.registerButton}
                            onClick={handleRegister}
                        >
                            Đăng ký
                        </div>
                    </div>
                    <div className={style.login}></div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;
