import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { tmdbAPI } from '../../utils/api_config';
import Button from '../button/Button';

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

const MovieItem = ({ item = {} }) => {
   // const [movie, setMovie] = useState(item);
   // console.log(movie);
   return (
      <MovieItemStyles>
         <div className='movies_item-container'>
            <div className='movies_item'>
               <div className='item_image-container'>
                  <img
                     srcSet={
                        item?.backdrop_path
                           ? tmdbAPI.getImage('w500', item?.backdrop_path)
                           : 'http://image.tmdb.org/t/p/w500/ocUp7DJBIc8VJgLEw1prcyK1dYv.jpg'
                     }
                     alt=''
                  />
               </div>
               <div className='movies_item-name'>{item?.title}</div>
               <div className='movies_item-info'>
                  <span className='release_date'>
                     {item?.release_date?.slice(0, 4) || '1990'}
                  </span>
                  <div className='rated_container'>
                     <span className='rated'>{item?.vote_average}</span>
                     <i className='fa-solid fa-star'></i>
                  </div>
               </div>
               <Link to={`/movie/${item?.id}`}>
                  <Button>
                     <span>Watch Now</span>
                     <i className='fa-solid fa-circle-play'></i>
                  </Button>
               </Link>
            </div>
         </div>
      </MovieItemStyles>
   );
};

export default MovieItem;
