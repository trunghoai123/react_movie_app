import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { fetcher, tmdbAPI } from '../../utils/api_config';
import useSWR from 'swr';
import Button from '../button/Button';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BannerItemStyles = styled.div`
   height: 100%;
   .blur_slide {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
         to bottom,
         rgba(0, 0, 0, 0.1),
         rgba(0, 0, 0, 0.95)
      );
      border-radius: 10px;
   }
   .banner_container {
      height: 100%;
      width: 100%;
      img {
         height: 100%;
         width: 100%;
         object-fit: cover;
         border-radius: 10px;
      }
   }
   .banner_float-content {
      padding: 12px;
      color: whitesmoke;
      /* z-index: 1; */
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      .banner_title {
         padding: 0 24px 0 24px;
         font-size: 26px;
         font-weight: 600;
      }
      .list_category {
         padding-top: 16px;
         font-size: 13px;
         column-gap: 10px;
         display: flex;
         justify-content: flex-start;
         align-items: center;
         .category_item {
            border-radius: 5px;
            padding: 6px;
            border: solid 1px ${(props) => props.theme.inputText};
         }
      }
      .banner_button-container {
         padding-top: 16px;
         width: 200px;
         i {
            font-size: 22px;
         }
      }
   }
`;

const BannerItem = ({ item }) => {
   const { data, error } = useSWR(tmdbAPI.getMovieDetail(item?.id), fetcher);
   const [genreList, setGenreList] = useState([]);
   useEffect(() => {
      if (data?.genres) {
         setGenreList(data?.genres);
      }
   }, [data]);
   return (
      <BannerItemStyles>
         <div className='blur_slide'></div>
         <div className='banner_container'>
            <img
               srcSet={
                  tmdbAPI.getImage('original', item?.backdrop_path) ||
                  'http://image.tmdb.org/t/p/original/ocUp7DJBIc8VJgLEw1prcyK1dYv.jpg'
               }
               alt={item?.backdrop_path}
            />
         </div>
         <div className='banner_float-content'>
            <h1 className='banner_title'>{item.title}</h1>
            <div className='list_category'>
               {genreList.length !== 0 ? (
                  genreList.map((genre) => {
                     return (
                        <NavLink
                           key={genre.id}
                           to={'/'}
                           className='category_item'
                        >
                           {genre.name}
                        </NavLink>
                     );
                  })
               ) : (
                  <>
                     <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                        <Skeleton width='80px' style={{ height: '30px' }} />
                     </SkeletonTheme>
                     <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                        <Skeleton width='80px' style={{ height: '30px' }} />
                     </SkeletonTheme>
                     <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                        <Skeleton width='80px' style={{ height: '30px' }} />
                     </SkeletonTheme>
                  </>
               )}
            </div>
            <div className='banner_button-container'>
               <NavLink to={`/movie/${item?.id}`}>
                  <Button>
                     <span>Watch</span>
                     <i className='fa-regular fa-circle-play'></i>
                  </Button>
               </NavLink>
            </div>
         </div>
      </BannerItemStyles>
   );
};

BannerItem.propTypes = {
   item: PropTypes.object,
};
export default BannerItem;
