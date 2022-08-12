import React from 'react';
import styled from 'styled-components';
import HomeBanner from '../components/banner/HomeBanner';
import MovieList from '../components/movies/MovieList';
import NavBar from './NavBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import MovieItem from '../components/movies/MovieItem';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../utils/api_config';
import Button from '../components/button/Button';
const HomeMainStyles = styled.div`
   background-color: ${(props) => props.theme.bgHomeMain};
   width: 60%;
   height: 100%;
   padding: 20px;
   overflow: auto;
   ::-webkit-scrollbar {
      width: 4px;
   }

   ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
      background: ${(props) => props.theme.bgHomeMain};
   }

   ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.bgSideBar};
      border-radius: 10px;
   }
`;

const HomeMain = () => {
   return (
      <HomeMainStyles>
         <NavBar></NavBar>
         <div className='home_content'>
            <HomeBanner type='popular'></HomeBanner>
            <div className='home_lists'>
               <MovieList title='Now Playing' type='now_playing'></MovieList>
            </div>
            <div className='home_lists'>
               <MovieList title='Top Rated Movies' type='top_rated'></MovieList>
            </div>
         </div>
      </HomeMainStyles>
   );
};

export default HomeMain;
