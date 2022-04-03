import style from './footer.module.scss'

import { memo } from 'react'

const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.infomation}>
                <div className={style.address}>
                    <span><i className="fa-solid fa-location-dot"></i></span>
                    <span>Địa chỉ</span>
                    <span>HCM</span>
                </div>
                <div className={style.logo}>
                    <img src="https://res.yame.vn/Content/images/yame-f-logo-white.png" alt="logo" />
                    <span></span>
                </div>
                <div className={style.contact}>
                    <span><i className="fa-solid fa-envelope"></i></span>
                    <span>Email & Phone</span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={style.copyRight}>
                © 2022 All right reserved
            </div>
        </div>
    );
}

export default memo(Footer);
