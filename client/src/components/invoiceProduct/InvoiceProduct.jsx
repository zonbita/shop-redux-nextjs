import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';

import style from './invoiceProduct.module.scss'
import { parsePriceToString } from '../../util/index'

const InvoiceProduct = ({ product }) => {
    
    const [prod, setProd] = useState()

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`${process.env.URL}/api/product/find/${product.productId}`)
            setProd(res.data.product)
        }
        fetchProduct()
    }, [product])

    return (
        <div className={style.invoiceProduct}>
            <div className={style.imgItem}>
                <img
                    src={prod && prod.img[0]}
                    alt=""
                />
            </div>
            <div className={style.info}>
                <span className={style.nameProduct}>{prod && prod.title}</span>
                <span className={style.price}>{prod && parsePriceToString(prod.price)}</span>
                <span className={style.code}>{prod && prod.code}</span>
                <div className={style.amount}>
                    <span>Số lượng: </span>
                    <span>{product.quantity}</span>
                    <div className={style.delIcon}>
                        {/* <i className="fa-solid fa-trash"></i> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvoiceProduct;
