import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../button/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { fetcher, tmdbAPI } from '../../utils/api_config';
import useSWR from 'swr';
import BannerItem from './BannerItem';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const HomeBannerStyles = styled.div`
   user-select: none;
   height: 300px;
   width: 100%;
   position: relative;
   .swiper-pagination {
      .swiper-pagination-bullet-active-next,
      .swiper-pagination-bullet-active-prev {
         background-color: white;
      }
   }
   .swiper {
      height: 100%;
      .swiper-button-prev::after,
      .swiper-button-next::after {
         font-size: 28px;
         font-weight: 700;
      }
   }
`;

const HomeBanner = ({ type = 'popular' }) => {
   const { data, error } = useSWR(tmdbAPI.getListMovie(type, 1), fetcher);
   const [movies, setMovies] = useState([]);
   const [genreList, setGenreList] = useState([]);
   useEffect(() => {
      if (data?.results) {
         setMovies(data.results);
      }
   }, [data]);
   return (
      <HomeBannerStyles>
         {movies.length > 0 ? (
            <Swiper
               // slidesPerGroup={1}
               loopFillGroupWithBlank={true}
               loop={true}
               pagination={{
                  clickable: true,
                  dynamicBullets: true,
               }}
               navigation={true}
               modules={[Navigation, Pagination]}
               className='mySwiper'
            >
               {movies.length > 0 &&
                  movies.map((item, index) => {
                     return (
                        <SwiperSlide key={index}>
                           <BannerItem item={item}></BannerItem>
                        </SwiperSlide>
                     );
                  })}
            </Swiper>
         ) : (
            <SkeletonTheme baseColor='#444' highlightColor='#202020'>
               <Skeleton style={{ height: '100%', lineHeight: 2 }} />
            </SkeletonTheme>
         )}
      </HomeBannerStyles>
   );
};
BannerItem.propTypes = {
   type: PropTypes.oneOf(['popular', 'now_playing', 'top_rated']),
};
export default HomeBanner;
