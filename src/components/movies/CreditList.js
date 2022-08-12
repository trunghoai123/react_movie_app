import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { fetcher, tmdbAPI } from '../../utils/api_config';
import useSWR from 'swr';
const CreditStyles = styled.div`
   user-select: none;
   .swiper {
      height: 190px;
   }
`;

const CreditList = ({ movieId = '' }) => {
   const { data, error } = useSWR(
      tmdbAPI.getOthersOfMovie(movieId, 'credits'),
      fetcher
   );
   if (!data || error) return null;
   return (
      <CreditStyles className='credit_list'>
         <Swiper
            slidesPerView={4}
            spaceBetween={15}
            slidesPerGroup={2}
            loopFillGroupWithBlank={true}
            loop={true}
            pagination={{
               clickable: true,
               dynamicBullets: true,
            }}
            modules={[Pagination, Navigation]}
            className='mySwiper'
         >
            {data?.cast &&
               data?.cast.length > 0 &&
               data.cast.map((cast) => {
                  return (
                     <SwiperSlide key={cast.id}>
                        <div key={cast.id} className='credit_item'>
                           <div className='credit_img-container'>
                              <img
                                 title={cast?.original_name}
                                 srcSet={tmdbAPI.getImage(
                                    'w500',
                                    cast?.profile_path ||
                                       'http://image.tmdb.org/t/p/w500/zwWH6L85PcAJSl8d21ZtAhPUkZ5.jpg'
                                 )}
                                 alt=''
                              />
                           </div>
                           <div className='credit_name'>
                              {cast?.original_name}
                           </div>
                        </div>
                     </SwiperSlide>
                  );
               })}
         </Swiper>
      </CreditStyles>
   );
};

export default CreditList;
