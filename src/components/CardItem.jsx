import { useEffect, useState } from 'react';
import { db } from '../../firebase.config';
import { useParams } from 'react-router-dom';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { ListingItem } from './ListingItem';
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

export const CardItem = ({ onDelete }) => {
  const [listings, setListings] = useState([]);
  // Fetching the data from FireBase to get tacos info
  useEffect(() => {
    // Fetching Data from FireStore
    const data = async () => {
      // Get data from the collection
      const q = query(collection(db, 'tacos'));
      // Create snapshot
      const unsub = onSnapshot(
        q,
        querySnapshot => {
          if (querySnapshot.empty) {
            throw new Error('No tacos to load');
          } else {
            let result = [];
            querySnapshot.forEach(doc => {
              result.push({ id: doc.id, ...doc.data() });
            });

            setListings(result);
          }
        },
        err => {
          console.log(err);
        }
      );
    };
    return () => data();
  }, []);
  return (
    <div className="swiper-container">
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
          {listings.map(listing => (
            <SwiperSlide key={listing.id}>
              <ListingItem listing={listing} onDelete={onDelete} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <h2>No Tacos Available</h2>
      )}
    </div>
  );
};
