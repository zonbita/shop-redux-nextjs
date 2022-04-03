import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { userSelector } from '../../features/selector'
import Header from '../../components/header/Header'
import Notify from '../../components/notify/Notify'
import Footer from '../../components/footer/Footer'
import style from './infoMe.module.scss'
import userSlice from '../../features/users/userSlice'


const InfoMe = () => {
    const user = useSelector(userSelector)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        dispatch(userSlice.actions.logout())
        navigate('/')
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <Notify />
            <div className={style.infoMe}>
                <div className={style.options}>
                    <span className={style.account}>
                        Tài khoản của tôi
                    </span>
                    <span className={style.invoice}>
                        Đơn hàng
                    </span>
                    <span 
                        className={style.logout}
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </span>
                </div>

                <div className={style.info}>
                    <div className={style.title}>
                        TÀI KHOẢN CỦA TÔI
                    </div>
                    <span className={style.acc}>Thông tin tài khoản</span>
                    <div className={style.infoAccount}>
                        <span>Thông tin liên lạc</span>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span><Link className="link" to="/password">Thay đổi password</Link></span>                        
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default InfoMe;
