import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import colorless from "../../.././images/colorless.png";
import nearcolorless from "../../.././images/near-colorless.png";
// import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function SwiperColor() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        slidesPerView={"3"}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        
      >
        <SwiperSlide>
          <div className="Swiper_slide_gf">
            <img
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/colorless.png"
                }
            ></img>

          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="Swiper_slide_gf">
            
            <img
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/near-colorless.png"
                }
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="Swiper_slide_gf">
          <img
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/near-colorless.png"
                }
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="Swiper_slide_gf">
           
            <img
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/colorless.png"
                }
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="Swiper_slide_gf">
          <img
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/near-colorless.png"
                }
            ></img>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
