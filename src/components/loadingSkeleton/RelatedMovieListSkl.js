import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../utils/api_config';
import { uuidv4 } from '@firebase/util';
import MovieIListtemSkl from './MovieListItemSkl';

const MovieListStyles = styled.div`
   user-select: none;
   .swiper-pagination {
      .swiper-pagination-bullet-active-next,
      .swiper-pagination-bullet-active-prev {
         background-color: white;
      }
   }
   .movie_list-cnt {
      height: 320px;
      width: 100%;
      display: flex;
      column-gap: 12px;
      overflow: hidden;
   }
`;

const RelatedMovieListSkl = () => {
   return (
      <MovieListStyles>
         <div className='movie_list'>
            <div className='movie_list-cnt'>
               <Swiper
                  slidesPerView={3}
                  spaceBetween={15}
                  slidesPerGroup={3}
                  loopFillGroupWithBlank={true}
                  loop={true}
                  pagination={{
                     clickable: true,
                     dynamicBullets: true,
                  }}
                  modules={[Pagination, Navigation]}
                  // navigation={true}
                  className='mySwiper'
               >
                  {new Array(3).fill(0).map((item, index) => {
                     return (
                        <SwiperSlide key={uuidv4()}>
                           <MovieIListtemSkl key={uuidv4()}></MovieIListtemSkl>
                        </SwiperSlide>
                     );
                  })}
               </Swiper>
            </div>
         </div>
      </MovieListStyles>
   );
};

export default RelatedMovieListSkl;
