import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../utils/api_config';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const SideMovieItemStyles = styled.div`
   .side_item-container {
      margin-bottom: 12px;
      background-color: ${(props) => props.theme.bgMoviesItem};
      height: 100px;
      padding: 6px;
      border-radius: 5px;
      .side_item {
         column-gap: 8px;
         display: flex;
         height: 100%;
         .item_img-container {
            height: 100%;
            width: 40%;
            img {
               object-fit: cover;
               border-radius: 5px;
               height: 100%;
               width: 100%;
            }
            .image-skeleton {
               height: 100%;
               width: 100%;
            }
         }
         .side_item-des {
            width: 60%;
            .item_name {
               padding: 0 0 4px 0;
               font-size: 13px;
               color: ${(props) => props.theme.textSmoke};
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
            }
            .item_info {
               padding: 0 0 4px 0;
               display: flex;
               justify-content: space-between;
               align-items: center;
               font-size: 13px;
               .release_date {
                  color: ${(props) => props.theme.textGrayLight};
               }
               .item_info {
                  .rated {
                     padding: 0 6px 0 0;
                     color: ${(props) => props.theme.textGrayLight};
                  }
                  i {
                     color: #ffdc35;
                  }
               }
            }
            .list_category {
               display: flex;
               justify-content: flex-start;
               align-items: center;
               white-space: nowrap;
               overflow: hidden;
               column-gap: 6px;
               a {
                  color: ${(props) => props.theme.textSmoke};
                  border-radius: 5px;
                  font-size: 12px;
                  border: 1px solid ${(props) => props.theme.inputText};
                  padding: 6px;
                  display: inline-block;
               }
            }
         }
      }
   }
`;

const SideMovieItem = ({ item, ...props }) => {
   const { data, error } = useSWR(tmdbAPI.getMovieDetail(item?.id), fetcher);
   const [genreList, setGenreList] = useState([]);
   useEffect(() => {
      if (data?.genres) {
         setGenreList(data?.genres);
      }
   }, [data]);
   return (
      <SideMovieItemStyles>
         <div className='side_item-container'>
            <div className='side_item'>
               <div className='item_img-container'>
                  {item ? (
                     <img
                        srcSet={tmdbAPI.getImage('w500', item?.backdrop_path)}
                        alt=''
                     />
                  ) : (
                     <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                        <Skeleton style={{ height: '100%', lineHeight: 2 }} />
                     </SkeletonTheme>
                  )}
               </div>
               <div className='side_item-des'>
                  <div className='item_name'>{item?.title}</div>
                  <div className='item_info'>
                     <span className='release_date'>
                        {item?.release_date.slice(0, 4)}
                     </span>
                     <div className='item_info'>
                        <span className='rated'>{item?.vote_average}</span>
                        <i className='fa-solid fa-star'></i>
                     </div>
                  </div>
                  <div className='list_category'>
                     {genreList.length > 2
                        ? genreList.slice(0, 2).map((genre) => {
                             return (
                                <NavLink key={genre?.id} to={'/'}>
                                   {genre?.name}
                                </NavLink>
                             );
                          })
                        : genreList.map((genre) => {
                             return (
                                <NavLink key={genre?.id} to={'/'}>
                                   {genre?.name}
                                </NavLink>
                             );
                          })}
                  </div>
               </div>
            </div>
         </div>
      </SideMovieItemStyles>
   );
};

export default SideMovieItem;
