import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../components/header/Header'
import Notify from '../../components/notify/Notify';
import Slide from '../../components/slide/Slide';
import Footer from '../../components/footer/Footer';
import NewProduct from '../../components/newProduct/NewProduct';
import Follow from '../../components/follow/Follow';
import style from './home.module.scss'

const Home = () => {

    const [productMan, setProductMan] = useState([])
    const [productMale, setProductMale] = useState([])
    const [productChildren, setProductChildren] = useState([])

    
    
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchProducts = async () => {
            const man = await axios.get(`${process.env.URL}/api/product?_category=nam&_page=1&_limit=5`)
            const male = await axios.get(`${process.env.URL}/api/product?_category=nu&_page=1&_limit=5`)
            const children = await axios.get(`${process.env.URL}/api/product?_category=tre-em&_page=1&_limit=5`)

            setProductMan(man.data.products)
            setProductMale(male.data.products)
            setProductChildren(children.data.products)
        }
        fetchProducts()
    }, [])

    return (
            <>
                <Header />
                <Notify />
                <Slide />
                <div className={style.home}>
                    <div className={style.categoryMain}>
                        <div className={style.category}>
                            <img 
                                src="" 
                                alt="" 
                            />
                            <div className={style.info}>
                                <span className={style.categoryItem}>MEN UNDERWEAR</span>
                                <Link className="link" to="/products/nam">XEM NGAY</Link>
                            </div>
                        </div>
                        <div className={style.category}>
                            <img 
                                src="" 
                                alt="" 
                            />
                            <div className={style.info}>
                                <span className={style.categoryItem}>WOMEN UNDERWEAR</span>
                                <Link className="link" to="/products/nu">XEM NGAY</Link>
                            </div>
                        </div>
                        <div className={style.category}>
                            <img 
                                src="" 
                                alt="" 
                            />
                            <div className={style.info}>
                                <span className={style.categoryItem}>KIDS</span>
                                <Link className="link" to="/products/tre-em">XEM NGAY</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <NewProduct products={productMan} title="SẢN PHẨM MỚI" banner=""/>
                <NewProduct products={productMale} title="SẢN PHẨM GIÁ TỐT" banner=""/>
                <NewProduct products={productChildren} title="SẢN PHẨM BÁN CHẠY NHẤT" banner=""/>
                <Follow />
                <Footer />
            </>
    );
}

export default Home;
