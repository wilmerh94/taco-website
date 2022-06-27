import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import './Swiper.css';
import { CardItem } from '../CardItem';
import background from '../../assets/jpg/TacoTruck1.jpg';

export const Swiper1 = () => {
  return (
    <div>
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation]}
        navigation={true}
        effect={'coverflow'}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: -50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        pagination={true}
        grabCursor={true}
        centeredSlides={true}
      >
        <SwiperSlide>
          <CardItem />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

// spaceBetween={50}
//onSlideChange={() => console.log('slide change')}
//onSwiper={swiper => console.log(swiper)}
