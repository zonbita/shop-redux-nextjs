import { useSelector }from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { useState } from 'react'
import { storage } from '../../firebase/index'
import { parseStringToArray } from '../../util/index'
import { tokenSelector } from '../../features/selector'
import style from './uploadProduct.module.scss'

export default function UploadProduct() {

    const token = useSelector(tokenSelector)

    let [title, setTitle] = useState('')
    let [category, setCategory] = useState('')
    let [code, setCode] = useState('')
    let [price, setPrice] = useState('')
    let [color, setColor] = useState('')
    let [size, setSize] = useState('')
    let [quantity, setQuantity] = useState('')
    let [sale, setSale] = useState('')
    let [material, setMaterial] = useState('')

    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)

    const [url1, setUrl1] = useState('')
    const [url2, setUrl2] = useState('')
    const [url3, setUrl3] = useState('')


    const handleChange1 = e => {
        if (e.target.files[0]) {
            setImage1(e.target.files[0])
        }
    }

    const handleChange2 = e => {
        if (e.target.files[0]) {
            setImage2(e.target.files[0])
        }
    }

    const handleChange3 = e => {
        if (e.target.files[0]) {
            setImage3(e.target.files[0])
        }
    }

    const handleUpload1 = () => {
        const uploadTask = storage.ref(`images/${image1.name}`).put(image1)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image1.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl1(url)
                    })
            }
        )
    }

    const handleUpload2 = () => {
        const uploadTask = storage.ref(`images/${image2.name}`).put(image2)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image2.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl2(url)
                    })
            }
        )
    }

    const handleUpload3 = () => {
        const uploadTask = storage.ref(`images/${image3.name}`).put(image3)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image3.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl3(url)
                    })
            }
        )
    }

    const handleUploadImg = async () => {
        await handleUpload1()
        await handleUpload2()
        await handleUpload3()
    }

    const handleUpload = async () => {

        category = parseStringToArray(category)
        color = parseStringToArray(color)
        size = parseStringToArray(size)
        material = parseStringToArray(material)

        const img = await [url1, url2, url3]

        const data = {
            title: title,
            category: category,
            code: code,
            price: price,
            color: color,
            size: size,
            quantity: quantity,
            sale: sale,
            img: img,
            material: material
        }

        console.log(data);

        await axios.post(`${process.env.URL}/api/product/create`, data, {
            headers: {
                token: token
            }
        })

        alert('Successfully')

    }

    return (
        <div className={style.uploadProduct}>
            <h1>THÊM SẢN PHẨM MỚI</h1>
            <div className={style.home}>
                <span><Link className="link" to="/">Home</Link></span>
            </div>
            <div className={style.addProduct}>
                <div className={style.formInput}>
                    <span>Title</span>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className={style.formInput}>
                    <span>Category</span>
                    <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                    <span className={style.status}>Nhập ngăn cách nhau bằng dấu phẩy (,)</span>
                </div>
                <div className={style.formInput}>
                    <span>Price</span>
                    <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div className={style.formInput}>
                    <span>Code Product</span>
                    <input
                        type="text"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                </div>
                <div className={style.formInput}>
                    <span>Color</span>
                    <input
                        type="text"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                    />
                    <span className={style.status}>Nhập ngăn cách nhau bằng dấu phẩy (,)</span>
                </div>
                <div className={style.formInput}>
                    <span>Size</span>
                    <input
                        type="text"
                        value={size}
                        onChange={e => setSize(e.target.value)}
                    />
                    <span className={style.status}>Nhập ngăn cách nhau bằng dấu phẩy (,)</span>
                </div>
                <div className={style.formInput}>
                    <span>Quantity</span>
                    <input
                        type="text"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />
                </div>
                <div className={style.formInput}>
                    <span>Sale</span>
                    <input
                        type="text"
                        value={sale}
                        onChange={e => setSale(e.target.value)}
                    />
                </div>
                <div className={style.formInput}>
                    <span>Material</span>
                    <input
                        type="text"
                        value={material}
                        onChange={e => setMaterial(e.target.value)}
                    />
                    <span className={style.status}>Nhập ngăn cách nhau bằng dấu phẩy (,)</span>
                </div>
                <div className={style.formInput}>
                    <div className={style.imgItem}>
                        <span>Image 1: </span>
                        <input onChange={handleChange1} type="file" />
                    </div>
                    <div className={style.imgItem}>
                        <span>Image 2: </span>
                        <input onChange={handleChange2} type="file" />
                    </div>
                    <div className={style.imgItem}>
                        <span>Image 3: </span>
                        <input onChange={handleChange3} type="file" />
                    </div>
                </div>
            </div>
            <div onClick={handleUploadImg} className={style.uploadImg}>UploadImg</div>
            <div className={style.upload}>
                <span onClick={handleUpload}>Upload</span>
            </div>
            <img src={url1} alt="" />
        </div>
    )
}
