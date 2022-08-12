import React, { useEffect, useReducer } from 'react';
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
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../utils/api_config';
import Button from '../components/button/Button';
import CreditList from '../components/movies/CreditList';
import VideoList from '../components/movies/VideoList';
import RelatedMovieList from '../components/movies/RelatedMovieList';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CreditListSkl from '../components/loadingSkeleton/CreditListSkl';
import MovieIListtemSkl from '../components/loadingSkeleton/MovieListItemSkl';
import RelatedMovieListSkl from '../components/loadingSkeleton/RelatedMovieListSkl';
const DetailMainStyles = styled.div`
   user-select: none;
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
   .detail_content {
      width: 100%;
      .title_container {
         font-size: 26px;
         color: ${(props) => props.theme.textSmoke};
         font-weight: 600;
         text-align: center;
         padding: 28px 0px 28px 0;
      }
      .main_img-container {
         width: 100%;
         img {
            width: 100%;
            height: 340px;
            object-fit: cover;
         }
      }
      .movie_name {
         padding: 20px 0 28px 0;
         font-weight: 700;
         font-size: 30px;
         text-align: center;
         color: ${(props) => props.theme.textSmoke};
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         background: linear-gradient(
            to right bottom,
            ${(props) => props.theme.primary} 0%,
            ${(props) => props.theme.primary_2} 100%
         );
         background-clip: text;
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
      }
      .list_category {
         padding: 0 0 30px 0;
         display: flex;
         justify-content: center;
         align-items: center;
         column-gap: 20px;
         .category_item {
            user-select: none;
            padding: 6px 12px;
            opacity: 0.85;
            font-weight: 700;
            border-radius: 20px;
            color: ${(props) => props.theme.primary};
            border: 1px solid ${(props) => props.theme.primary};
         }
      }
      .overview_text {
         color: ${(props) => props.theme.textSmoke};
         font-size: 14px;
         text-align: center;
         padding: 0 0 36px 0%;
      }
      .detail_info {
         padding: 0 0 36px 0;
         width: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
         color: ${(props) => props.theme.textSmoke};
         .detail_name {
            text-align: right;
         }
         .detail_name,
         .detail_value {
            width: 50%;
            div {
               background-color: ${(props) => props.theme.bgMoviesItem};
               padding: 4px 10px;
            }
            div:nth-child(odd) {
               background-color: ${(props) => props.theme.inputText};
            }
         }
      }
      .credit_list {
         display: flex;
         justify-content: start;
         align-items: center;
         /* column-gap: 12px; */
         .credit_item {
            /* width: 140px; */
            .credit_img-container {
               width: 100%;
               img {
                  border-radius: 5px;
                  height: 140px;
                  width: 100%;
                  object-fit: cover;
               }
            }
         }
         .credit_name {
            padding: 4px 0 0 0;
            color: ${(props) => props.theme.textSmoke};
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
         }
      }
   }
`;

const DetailMain = () => {
   const { slug } = useParams();
   const { data } = useSWR(tmdbAPI.getMovieDetail(slug), fetcher);
   // get list language and render language name
   const getLanguages = (spoken_languages = []) => {
      let langArr = [];
      if (spoken_languages.length > 0) {
         langArr = spoken_languages.reduce((prev, current, index, arr) => {
            return [...prev, current.english_name];
         }, []);
      } else {
         return [spoken_languages.english_name];
      }
      return langArr.join(', ');
   };
   useEffect(() => {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }, [slug]);
   // if (!data) return null;
   return (
      <DetailMainStyles>
         <NavBar></NavBar>
         <div className='detail_content'>
            <div className='main_img-container'>
               {data && data.backdrop_path ? (
                  <img
                     srcSet={tmdbAPI.getImage('original', data?.backdrop_path)}
                     alt=''
                  />
               ) : (
                  <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                     <Skeleton style={{ height: '340px', lineHeight: 2 }} />
                  </SkeletonTheme>
               )}
            </div>
            <h1 className='movie_name'>
               {data?.title || (
                  <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                     <Skeleton
                        style={{
                           marginTop: '16px',
                           height: '30px',
                           lineHeight: 2,
                        }}
                     />
                  </SkeletonTheme>
               )}
            </h1>
            <div className='list_category'>
               {!data?.genres ? (
                  <>
                     <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                        <Skeleton
                           style={{
                              width: '65px',
                              height: '30px',
                           }}
                        />
                     </SkeletonTheme>
                     <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                        <Skeleton
                           style={{
                              width: '65px',
                              height: '30px',
                              lineHeight: 2,
                           }}
                        />
                     </SkeletonTheme>
                     <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                        <Skeleton
                           style={{
                              width: '65px',
                              height: '30px',
                           }}
                        />
                     </SkeletonTheme>
                  </>
               ) : (
                  ''
               )}
               {data?.genres.length > 0 &&
                  data?.genres.map((genre) => {
                     return (
                        <span key={genre.id} className='category_item'>
                           {genre.name}
                        </span>
                     );
                  })}
            </div>
            <div className='overview_text'>{data?.overview}</div>
            <div className='detail_info'>
               <div className='detail_name'>
                  <div>Adult</div>
                  <div>Language</div>
                  <div>Release Date</div>
                  <div>Vote Average</div>
                  <div>Vote Count</div>
               </div>
               <div className='detail_value'>
                  <div>{data?.adult ? 'Yes' : 'No'}</div>
                  <div>
                     {data?.spoken_languages.length > 0
                        ? getLanguages(data?.spoken_languages)
                        : 'Unknown Language'}
                  </div>
                  <div>{data?.release_date || 2022}</div>
                  <div>{data?.vote_average || 0.1}</div>
                  <div>{data?.vote_count || 100}</div>
               </div>
            </div>
            <h1 className='title_container'>Credits</h1>
            {data?.id ? (
               <CreditList movieId={data?.id}></CreditList>
            ) : (
               <CreditListSkl></CreditListSkl>
            )}
            <h1 className='title_container'>Trailer Videos</h1>
            {data?.id ? (
               <VideoList movieId={data?.id}></VideoList>
            ) : (
               <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                  <Skeleton style={{ height: '360px' }} />
               </SkeletonTheme>
            )}
            {/* <VideoList movieId={data?.id}></VideoList> */}
            <h1 className='title_container'>Related Movies</h1>
            {data?.id ? (
               <RelatedMovieList movieId={data?.id}></RelatedMovieList>
            ) : (
               <RelatedMovieListSkl></RelatedMovieListSkl>
            )}
         </div>
      </DetailMainStyles>
   );
};

export default DetailMain;
