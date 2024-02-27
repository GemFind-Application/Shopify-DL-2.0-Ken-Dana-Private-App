import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import dia_image from '../../../images/diamond-image.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function SwiperClarity() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
   
      <Swiper
        style={{
          '--swiper-navigation-color': '#000',
          '--swiper-pagination-color': '#000',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gf_slider_left"
      >
      
        <SwiperSlide>
        <div className="gf_diamond_info_slider">
              <div className="Gf_Diamond_image">
                  <img  src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond-image.png"
                }  height={'100px'} width={'100px'}></img>
              </div>
              <div className="Gf_Diamond_details">
                <h3>FL</h3>
                <span>Flawless</span>
                <p>No inclusions and no blemishes visible to a skilled grader using 10x magnification.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="gf_diamond_info_slider">
              <div className="Gf_Diamond_image">
                  <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond-image.png"
                }  height={'100px'} width={'100px'}></img>
              </div>
              <div className="Gf_Diamond_details">
                <h3>IF</h3>
                <span>Internally Flawless</span>
                <p>No inclusions and only blemishes are visible to a skilled grader using 10x magnification.</p>
              </div>
          </div>
        </SwiperSlide>
         <SwiperSlide>
         <div className="gf_diamond_info_slider">
              <div className="Gf_Diamond_image">
                  <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond-image.png"
                }  height={'100px'} width={'100px'}></img>
              </div>
              <div className="Gf_Diamond_details">
                <h3>VVS1</h3>
                <span>Very, Very Slightly Included</span>
                <p>Minute inclusions that range from extremely difficult to very difficult to see are visible to a skilled grader using 10x magnification.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="gf_diamond_info_slider">
              <div className="Gf_Diamond_image">
                  <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond-image.png"
                }  height={'100px'} width={'100px'}></img>
              </div>
              <div className="Gf_Diamond_details">
                <h3>VVS2</h3>
                <span>Very, Very Slightly Included</span>
                <p>Minute inclusions that range from extremely difficult to very difficult to see are visible to a skilled grader using 10x magnification.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="gf_diamond_info_slider">
              <div className="Gf_Diamond_image">
                  <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond-image.png"
                }  height={'100px'} width={'100px'}></img>
              </div>
              <div className="Gf_Diamond_details">
                <h3>VS1</h3>
                <span> Very Slightly Included</span>
                <p>Minor inclusions that range from difficult to somewhat easy to see are visible to a skilled grader using 10x magnification.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="gf_diamond_info_slider">
              <div className="Gf_Diamond_image">
                  <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond-image.png"
                }  height={'100px'} width={'100px'}></img>
              </div>
              <div className="Gf_Diamond_details">
                <h3>VS2</h3>
                <span> Very Slightly Included</span>
                <p>Minor inclusions that range from difficult to somewhat easy to see are visible to a skilled grader using 10x magnification.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="gf_diamond_info_slider">
              <div className="Gf_Diamond_image">
                  <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond-image.png"
                }  height={'100px'} width={'100px'}></img>
              </div>
              <div className="Gf_Diamond_details">
                <h3>S1</h3>
                <span>Slightly Included</span>
                <p>Noticeable inclusions that range from easy to very easy to see are visible to a skilled grader using 10x magnification.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="gf_diamond_info_slider">
              <div className="Gf_Diamond_image">
                  <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond-image.png"
                }  height={'100px'} width={'100px'}></img>
              </div>
              <div className="Gf_Diamond_details">
                <h3>S2</h3>
                <span>Slightly Included</span>
                <p>Noticeable inclusions that range from easy to very easy to see are visible to a skilled grader using 10x magnification.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="gf_diamond_info_slider">
              <div className="Gf_Diamond_image">
                  <img src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond-image.png"
                }  height={'100px'} width={'100px'}></img>
              </div>
              <div className="Gf_Diamond_details">
                <h3>I1</h3>
                <span>Included</span>
                <p>Obvious inclusions are visible to a skilled grader using 10x magnification and may affect transparency and brilliance.</p>
              </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper gf_slider_right-tab"
      >
        <SwiperSlide>
       <div className='clarity_gf_data'>
        <table>
          <tr>
            <td>FL</td>
            <td>Flawless</td>
          </tr>
        </table>
       </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='clarity_gf_data'>
        <table>
          <tr>
            <td>IF</td>
            <td>Internally Flawless</td>
          </tr>
        </table>
       </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='clarity_gf_data'>
        <table>
          <tr>
            <td>VVS1</td>
            <td>Very. Very Slightly Included</td>
          </tr>
        </table>
       </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='clarity_gf_data'>
        <table>
          <tr>
            <td>VVS2</td>
            <td>Very. Very Slightly Included</td>
          </tr>
        </table>
       </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='clarity_gf_data'>
        <table>
          <tr>
            <td>VS1</td>
            <td>Very Slightly Included</td>
          </tr>
        </table>
       </div>
        </SwiperSlide>
        <SwiperSlide>
       <div className='clarity_gf_data'>
        <table>
          <tr>
            <td>VS2</td>
            <td>Very. Very Slightly Included</td>
          </tr>
        </table>
       </div>
        </SwiperSlide>
        <SwiperSlide>
       <div className='clarity_gf_data'>
        <table>
          <tr>
            <td>S1</td>
            <td>Slightly Included</td>
          </tr>
        </table>
       </div>
        </SwiperSlide>
        <SwiperSlide>
       <div className='clarity_gf_data'>
        <table>
          <tr>
            <td>S2</td>
            <td>Slightly Included</td>
          </tr>
        </table>
       </div>
        </SwiperSlide>
        <SwiperSlide>
       <div className='clarity_gf_data'>
        <table>
          <tr>
            <td>I1</td>
            <td>Included</td>
          </tr>
        </table>
       </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
