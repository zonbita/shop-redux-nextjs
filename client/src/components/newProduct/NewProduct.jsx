import Product from '../product/Product'
import style from './newProduct.module.scss'

export default function NewProduct({ products, title, banner }) {
    return (
        <>
            <div className={style.title}>{title}</div>
            <div className={style.banner}>
                <img 
                    src={banner} 
                    alt="" 
                />
            </div>
            <div className={style.newProduct}>
                {
                    products && products.map((product, index) => 
                        <Product 
                            key={index}
                            product={product}
                        />
                )
                }
            </div>
        </>
    )
}
