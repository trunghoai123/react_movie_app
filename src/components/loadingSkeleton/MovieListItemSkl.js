import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { tmdbAPI } from '../../utils/api_config';
import Button from '../button/Button';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const MovieItemStyles = styled.div`
   /* width: 180px; */
   user-select: none;
   .movies_item-container {
      /* max-width: 180px;  */
      border-radius: 5px;
      background-color: ${(props) => props.theme.bgMoviesItem};
      padding: 8px;
      .movies_item {
         .item_image-container {
            img {
               object-fit: cover;
               border-radius: 5px;
               height: 160px;
            }
         }
         .movies_item-name {
            color: ${(props) => props.theme.textSmoke};
            font-size: 13px;
            padding: 4px 0 0 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
         }
         .movies_item-info {
            display: flex;
            justify-content: space-between;
            padding: 4px 0 20px 0;
            font-size: 12px;
            .release_date {
               color: ${(props) => props.theme.textGrayLight};
            }
            .rated_container {
               .rated {
                  padding: 0 4px 0 0;
                  color: ${(props) => props.theme.textGrayLight};
               }
               i {
                  color: #ffdc35;
               }
            }
         }
      }
   }
`;

const MovieIListtemSkl = ({ ...props }) => {
   // const [movie, setMovie] = useState(item);
   // console.log(movie);
   return (
      <MovieItemStyles {...props}>
         <div className='movies_item-container'>
            <div className='movies_item'>
               <div className='item_image-container'>
                  <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                     <Skeleton style={{ height: '160px', lineHeight: 2 }} />
                  </SkeletonTheme>
               </div>
               <div className='movies_item-name'>
                  <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                     <Skeleton style={{ lineHeight: '20px' }} />
                  </SkeletonTheme>
               </div>
               <div className='movies_item-info'>
                  <span className='release_date'>
                     <SkeletonTheme baseColor='#444' highlightColor='#202020'>
                        <Skeleton
                           style={{ width: '40px', lineHeight: '15px' }}
                        />
                     </SkeletonTheme>
                  </span>
                  <div className='rated_container'>
                     {/* <span className='rated'> */}
                     <SkeletonTheme
                        className='rated'
                        baseColor='#444'
                        highlightColor='#202020'
                     >
                        <Skeleton
                           style={{ width: '50px', lineHeight: '15px' }}
                        />
                     </SkeletonTheme>
                     {/* </span> */}
                  </div>
               </div>
               <SkeletonTheme
                  className='rated'
                  baseColor='#444'
                  highlightColor='#202020'
               >
                  <Skeleton style={{ height: '40px' }} />
               </SkeletonTheme>
               {/* <Link to={`/movie/${item?.id}`}>
                  <Button>
                     <span>Watch Now</span>
                     <i className='fa-solid fa-circle-play'></i>
                  </Button>
               </Link> */}
            </div>
         </div>
      </MovieItemStyles>
   );
};

export default MovieIListtemSkl;
