import { ListingItem } from '../ListingItem';
// Swiper React
import { Swiper, SwiperSlide } from 'swiper/react';
// Require modules for Swiper1
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
// Style
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CardItem.css';
import { useFetching } from '../../Hooks/useListing';

export const CardItem = () => {
  const { error, isLoading, listings, onDelete } = useFetching(
    'tacos'
  );
  return (
    <div className="swiper-container">
      {error && <p>{error}</p>}
      {isLoading && <p>Loading ... </p>}
      {listings.length > 0 ? (
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation]}
          navigation={true}
          grabCursor={true}
          pagination={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          effect={'coverflow'}
          coverflowEffect={{
            rotate: -50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
          }}
          loop={true}
        >
          {listings.id ||
            listings.map(listing => (
              <SwiperSlide key={listing?.id}>
                <ListingItem
                  listing={listing}
                  onDelete={() => onDelete(listing.id)}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <h2>No Tacos Available</h2>
      )}
    </div>
  );
};
