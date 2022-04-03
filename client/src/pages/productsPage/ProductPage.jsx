import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { useRef } from 'react'
import axios from 'axios'


import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import SideBar from '../../components/sidebar/SideBar'
import Product from '../../components/product/Product'
import Notify from '../../components/notify/Notify'
import style from './productPage.module.scss'
import { productsSelector } from '../../features/selector'



import productSlice from '../../features/products/productSlice'
import NewProduct from '../../components/newProduct/NewProduct'

export default function ProductPage({ category, title, banner }) {
  const {slug} = useParams()

  const dispatch = useDispatch()

  const products = useSelector(productsSelector)

  const [newProduct, setNewProduct] = useState()

  const [index, setIndex] = useState(1)

  const nextRef = useRef()
  const prevRef = useRef()

  const handlepagination = (n) => {
    if(index === 1 && n === -1) {
      prevRef.current.style.color = 'gray'
      prevRef.current.style.cursor = 'default'
      setIndex(1)
    }
    else {
      prevRef.current.style.color = 'black'
      prevRef.current.style.cursor = 'pointer'
      setIndex(index + n)
    }
  }

  
  const handleSort = (sort) => {
    const fetchProduct = async () => {
      const res = await axios.get(`${process.env.URL}/api/product?_category=${category}&_page=${index}&_limit24&_sort=price&_order=${sort}`)

      localStorage.setItem('product', JSON.stringify(res.data.products))
      dispatch(productSlice.actions.addProduct(res.data.products))
    }

    fetchProduct()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const fetchProduct = async () => {
      if(!slug) {
        const res = await axios.get(`${process.env.URL}/api/product?_category=${category}&_page=${index}&_limit24`)
        localStorage.setItem('product', JSON.stringify(res.data.products))
        dispatch(productSlice.actions.addProduct(res.data.products))
      }
      else {
        const res = await axios.get(`${process.env.URL}/api/product/search/t/?s=${slug}`)
        localStorage.setItem('product', JSON.stringify(res.data.products))
        dispatch(productSlice.actions.addProduct(res.data.products))
      }
    }

    const fetchProducts = async () => {
      const res = await axios.get(`${process.env.URL}/api/product?_category=${category}&_page=1&_limit=5`)

      setNewProduct(res.data.products)
  }
    
    fetchProducts()
    fetchProduct()
  }, [category, index, slug, dispatch])

  return (
    <>
        <Header />
        <Notify />
        <div className={style.productPage}>
            <div className={style.sideBar}>
                <SideBar page={index} category={category}/>
            </div>
            <div className={style.products}>
                <span className={style.title}>
                    {title}
                </span>
                <div className={style.banner}>
                  <img 
                    src={banner}
                    alt="" 
                  />
                </div>
                <div className={style.sort}>
                  <span>Sắp xếp theo giá :</span>
                  <span onClick={() => handleSort("asc")}>
                    Tăng dần 
                    <i className="fa-solid fa-arrow-up"></i>
                  </span>
                  <span onClick={() => handleSort("desc")}>
                    Giảm dần 
                    <i className="fa-solid fa-arrow-down"></i>
                  </span>
                </div>
                <div className={style.wrapper}>
                  {
                    products && products.map((product, index) => {
                      return (
                        <Product 
                          key={index}
                          product={product}
                        />
                      )
                    })
                  }
                </div>
                <div className={style.pagination}>
                  <span 
                    ref={prevRef}
                    onClick={() => handlepagination(-1)}
                  >
                    «
                  </span>
                  <span onClick={() => setIndex(index)}>{index}</span>
                  <span onClick={() => setIndex(index + 1)}>{index + 1}</span>
                  <span onClick={() => setIndex(index + 2)}>{index + 2}</span>
                  <span 
                    ref={nextRef}
                    onClick={() => handlepagination(1)}
                  >
                    »
                  </span>
                </div>
            </div>
        </div>
        <NewProduct products={newProduct} title="SẢN PHẨM MỚI"/>
        <Footer />
    </>
  )
}
