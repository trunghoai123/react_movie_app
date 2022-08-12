import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import RelatedMovieItem from './RelatedMovieItem';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../utils/api_config';

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

const RelatedMovieList = ({ children, movieId = '', ...props }) => {
   const { data, error } = useSWR(
      tmdbAPI.getOthersOfMovie(movieId, 'similar'),
      fetcher
   );
   if (!data || error) return null;
   return (
      <MovieListStyles>
         <div className='movie_list'>
            <div className='movie_list-cnt'>
               <Swiper
                  slidesPerView={3}
                  spaceBetween={15}
                  slidesPerGroup={2}
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
                  {data &&
                     data?.results.length > 1 &&
                     data.results.map((movie) => {
                        return (
                           <SwiperSlide>
                              <RelatedMovieItem
                                 movie={movie}
                              ></RelatedMovieItem>
                           </SwiperSlide>
                        );
                     })}
               </Swiper>
            </div>
         </div>
      </MovieListStyles>
   );
};

export default RelatedMovieList;
