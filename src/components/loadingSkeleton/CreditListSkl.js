import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { uuidv4 } from '@firebase/util';
import { fetcher, tmdbAPI } from '../../utils/api_config';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const CreditStyles = styled.div`
   user-select: none;
   .swiper {
      height: 190px;
   }
`;

const CreditListSkl = () => {
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
            <SwiperSlide key={uuidv4()}>
               <div className='credit_item' key={uuidv4()}>
                  <div className='credit_img-container'>
                     <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                        <Skeleton style={{ height: '142px', lineHeight: 2 }} />
                     </SkeletonTheme>
                  </div>
                  <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                     <Skeleton style={{ height: '22px', lineHeight: 2 }} />
                  </SkeletonTheme>
               </div>
            </SwiperSlide>
         </Swiper>
      </CreditStyles>
   );
};

export default CreditListSkl;
