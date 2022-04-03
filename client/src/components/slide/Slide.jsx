import { useEffect, useState } from 'react'

import style from './slide.module.scss'

export default function Slide() {

  const [slide, setSlide] = useState('')

  useEffect(() => {
        let index = 0

        const listImg = [
        "https://cmsv2.yame.vn/uploads/9d1c0209-a602-407b-a43d-a178b8772a5f/BANNER-WEB-1-CHU.jpg?quality=80&w=0&h=0",
        "https://cmsv2.yame.vn/uploads/5359ff1e-df1c-49f1-af8c-cf72b7f48726/BANNER-WEB-2-CH%e1%bb%ae.jpg?quality=80&w=0&h=0",
      ]

        const timerId = setInterval(() => {
          index = index < listImg.length ? index : 0
          setSlide(listImg[index])
          index ++
        }, 3000)
        return () => clearInterval(timerId)
  
  }, [])

  return (
    <div className={style.slide}>
        <div className={style.slideWraper}>
            <img 
              src={slide}
              alt="" 
              className={style.slideIcon} 
            />
        </div>
        
    </div>
  )
}
