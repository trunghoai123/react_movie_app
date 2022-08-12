import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Actions from './Actions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import MovieItem from './MovieItem';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../utils/api_config';
import MovieIListtemSkl from '../loadingSkeleton/MovieListItemSkl';

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

const MovieList = ({ children, type = 'popular', title = '', ...props }) => {
   const { data, error } = useSWR(tmdbAPI.getListMovie(type, 1), fetcher);
   const [movies, setMovies] = useState([]);
   useEffect(() => {
      if (data?.results) {
         setMovies(data.results);
      }
   }, [data]);
   // console.log(movies);
   return (
      <MovieListStyles>
         <div className='movie_list'>
            <Actions title={title}></Actions>
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
                  {movies.length > 0
                     ? movies.map((item, index) => {
                          return (
                             <SwiperSlide key={index}>
                                <MovieItem item={item}></MovieItem>
                             </SwiperSlide>
                          );
                       })
                     : new Array(3).fill(0).map((item, index) => {
                          return (
                             <SwiperSlide key={index}>
                                <MovieIListtemSkl></MovieIListtemSkl>
                             </SwiperSlide>
                          );
                       })}
               </Swiper>
            </div>
         </div>
      </MovieListStyles>
   );
};

export default MovieList;
