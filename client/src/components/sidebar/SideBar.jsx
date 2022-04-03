import { useEffect, useRef, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'

import style from './sideBar.module.scss'
import productSlice from '../../features/products/productSlice'

const Sidebar = ({ category, page }) => {
    const dispatch = useDispatch()

    const categorys = ["Tất cả", "Sản phẩm đặc biệt", "Đồ lót", "Quần áo", "Bít tất"]
    const colors = ["Tất cả", "Cam", "Nâu", "Trắng", "Vàng", "Đỏ", "Xám", "Xanh", "Pink"]
    const sizes = ["Tất cả", "S", "M", "M/L", "L", "XL", "XL/XXL", "XXL"]
    const materials = ["Tất cả", "Acrylic & Rayon", "Coolmax Polyester", "Cotton Pima", "Polyester", "Tencel & Polyester"]

    const categoryChange = ["","dac-biet", "do-lot", "quan-ao", "bit-tat"]
    const colorChange = ["", "orange", "brown", "white", "yellow", "red", "grey", "blue", "pink"]
    const sizeChange = ["", "S", "M", "M/L", "L", "XL", "XL/XXL", "XXL"]
    const materialChange = ["", "acrylic", "coolmax-polyester", "cotton", "polyester", "tencel-polyester"]

    const [checkCategory, setCheckCategory] = useState()
    const [checkColor, setCheckColor] = useState()
    const [checkSize, setCheckSize] = useState()
    const [checkMaterial, setCheckMaterial] = useState()

    const showOptionRef_1 = useRef()
    const changeIconRef_1 = useRef()

    const showOptionRef_2 = useRef()
    const changeIconRef_2 = useRef()

    const showOptionRef_3 = useRef()
    const changeIconRef_3 = useRef()

    const showOptionRef_4 = useRef()
    const changeIconRef_4 = useRef()

    useEffect(() => {
        const productObj = {}

        // productObj._category = category
        productObj._category = categoryChange[checkCategory]
        productObj._color = colorChange[checkColor]
        productObj._size = sizeChange[checkSize]
        productObj._material = materialChange[checkMaterial]
        productObj._page = page

        let newQuery = {}

        for(const key in productObj) {
            if(productObj[key]) {
                newQuery = {...newQuery, [key]: productObj[key]}
            }
        }

        let queryString = ''

        for(const key in newQuery) {
            queryString += [key] + '=' + newQuery[key] + '&'
        }

        queryString = queryString.slice(0, queryString.length - 1)

        const fetchProduct = async () => {
            const res = await axios.get(`${process.env.URL}/api/product?${queryString}`)
            dispatch(productSlice.actions.addProduct(res.data.products))
        }

        fetchProduct()
    })

    const handleShowOption = (n) => {
        switch (n) {
            case 1:
                if (showOptionRef_1.current.style.display === 'none' ||
                    showOptionRef_1.current.style.display === '') {
                    showOptionRef_1.current.style.display = 'flex'
                    changeIconRef_1.current.className = 'fa-solid fa-angle-up'
                }
                else {
                    showOptionRef_1.current.style.display = 'none'
                    changeIconRef_1.current.className = 'fa-solid fa-angle-down'
                }
                break
            case 2:
                if (showOptionRef_2.current.style.display === 'none' ||
                    showOptionRef_2.current.style.display === '') {
                    showOptionRef_2.current.style.display = 'flex'
                    changeIconRef_2.current.className = 'fa-solid fa-angle-up'
                }
                else {
                    showOptionRef_2.current.style.display = 'none'
                    changeIconRef_2.current.className = 'fa-solid fa-angle-down'
                }
                break
            case 3:
                if (showOptionRef_3.current.style.display === 'none' ||
                    showOptionRef_3.current.style.display === '') {
                    showOptionRef_3.current.style.display = 'flex'
                    changeIconRef_3.current.className = 'fa-solid fa-angle-up'
                }
                else {
                    showOptionRef_3.current.style.display = 'none'
                    changeIconRef_3.current.className = 'fa-solid fa-angle-down'
                }
                break
            case 4:
                if (showOptionRef_4.current.style.display === 'none' ||
                    showOptionRef_4.current.style.display === '') {
                    showOptionRef_4.current.style.display = 'flex'
                    changeIconRef_4.current.className = 'fa-solid fa-angle-up'
                }
                else {
                    showOptionRef_4.current.style.display = 'none'
                    changeIconRef_4.current.className = 'fa-solid fa-angle-down'
                }
                break
            default:

        }
    }

    return (
        <div className={style.sideBar}>
            <div className={style.options}>
                <div
                    className={style.title}
                    onClick={() => { handleShowOption(1) }}
                >
                    DANH MỤC
                    <span
                        className={style.showIcon}
                    >
                        <i
                            ref={changeIconRef_1}
                            className="fa-solid fa-angle-down"
                        >

                        </i>
                    </span>
                </div>
                <div className={style.wrapper} ref={showOptionRef_1}>
                    {
                        categorys.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={style.items}
                                >
                                    <input
                                        checked={checkCategory === index}
                                        className={style.checkbox}
                                        type="radio"
                                        onChange={() => setCheckCategory(index)}
                                    />
                                    <span>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={style.options}>
                <div
                    className={style.title}
                    onClick={() => { handleShowOption(2) }}
                >
                    MÀU SẮC
                    <span
                        className={style.showIcon}
                    >
                        <i
                            ref={changeIconRef_2}
                            className="fa-solid fa-angle-down"
                        >

                        </i>
                    </span>
                </div>
                <div className={style.wrapper} ref={showOptionRef_2}>
                    {
                        colors.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={style.items}
                                >
                                    <input
                                        checked={checkColor === index}
                                        className={style.checkbox}
                                        type="radio"
                                        onChange={() => setCheckColor(index)}
                                    />
                                    <span>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={style.options}>
                <div
                    className={style.title}
                    onClick={() => { handleShowOption(3) }}
                >
                    KÍCH CỠ
                    <span
                        className={style.showIcon}
                    >
                        <i
                            ref={changeIconRef_3}
                            className="fa-solid fa-angle-down"
                        >

                        </i>
                    </span>
                </div>
                <div className={style.wrapper} ref={showOptionRef_3}>
                    {
                        sizes.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={style.items}
                                >
                                    <input
                                        checked={checkSize === index}
                                        className={style.checkbox}
                                        type="radio"
                                        onChange={() => setCheckSize(index)}
                                    />
                                    <span>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={style.options}>
                <div
                    className={style.title}
                    onClick={() => { handleShowOption(4) }}
                >
                    CHẤT LIỆU
                    <span
                        className={style.showIcon}
                    >
                        <i
                            ref={changeIconRef_4}
                            className="fa-solid fa-angle-down"
                        >

                        </i>
                    </span>
                </div>
                <div className={style.wrapper} ref={showOptionRef_4}>
                    {
                        materials.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={style.items}
                                >
                                    <input
                                        checked={checkMaterial === index}
                                        className={style.checkbox}
                                        type="radio"
                                        onChange={() => setCheckMaterial(index)}
                                    />
                                    <span>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default memo(Sidebar);
