import { Link } from 'react-router-dom'

import style from './product.module.scss'
import { parsePriceToString } from '../../util/index'

const Product = ({ product }) => {
    return (
        <div className={style.product}>
            <Link className="link" to={'/' + product.slug}>
                <div className={style.imgIcon}>
                    <img
                        src={product.img[0]}
                        alt=""
                    />
                </div>
            </Link>
            <div className={style.infoProduct}>
                <Link className="link" to={'/' + product.slug}>{product.title}</Link>
                <span>{parsePriceToString(product.price)}đ</span>
            </div>
        </div>
    );
}

export default Product;
