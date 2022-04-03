import { useEffect, useRef, memo } from 'react';

import style from './notify.module.scss'

const Notify = () => {
    const newRef = useRef() , saleRef = useRef()

    useEffect(() => {
        const timerId = setInterval(() => {
            if(newRef.current.style.display === 'none') {
                newRef.current.style.display = 'block'
                saleRef.current.style.display = 'none'
            }
            else {
                newRef.current.style.display = 'none'
                saleRef.current.style.display = 'block'
            }
        }, 2000)

        return () => clearInterval(timerId)
    }, [])

    return (
        <div className={style.notify}>
            <span 
                ref={newRef}
                className={style.covid}>Khách hàng có thể nhận được voucher khi mua 2 sản phẩm
            </span>
            <span 
                ref={saleRef}
                className={style.sale}>Giảm giá 30/11 
            </span>
        </div>
    );
}

export default memo(Notify);
