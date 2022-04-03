import { useRef } from 'react';

import Productcart from '../productCart/ProductCart';
import style from './cart.module.scss'

const Cart = () => {

    const backgroundOrderRef = useRef()
    const mainRef = useRef()

    const handleExitOrder = () => {
        mainRef.current.style.display = 'none'
    }

    return (
        <div 
            className={style.cart} 
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
                <Productcart />
            </div>

            <div className={style.total}>
                <div className={style.sumProducts}>
                    <span>Tổng tiền hàng</span>
                    <span>0.0đ</span>
                </div>
                <div className={style.order}>
                    <span>ĐẶT HÀNG</span>
                </div>
            </div>
        </div>
    );
}

export default Cart;
