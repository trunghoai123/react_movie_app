import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { tmdbAPI } from '../../utils/api_config';
import Button from '../button/Button';

const MovieItemStyles = styled.div`
   /* width: 180px; */
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

const RelatedMovieItem = ({ movie }) => {
   if (!movie) return null;
   return (
      <MovieItemStyles>
         <div className='movies_item-container'>
            <div className='movies_item'>
               <div className='item_image-container'>
                  <img
                     srcSet={
                        movie?.backdrop_path
                           ? tmdbAPI.getImage('w500', movie?.backdrop_path)
                           : 'http://image.tmdb.org/t/p/w500/wUzCzeM7ZRG0kHHOU8wiTrXdocd.jpg'
                     }
                     alt={movie?.title}
                  />
               </div>
               <div className='movies_item-name'>{movie?.title}</div>
               <div className='movies_item-info'>
                  <span className='release_date'>
                     {movie?.release_date.slice(0, 4)}
                  </span>
                  <div className='rated_container'>
                     <span className='rated'>
                        {movie?.vote_average.toString().slice(0, 3)}
                     </span>
                     <i className='fa-solid fa-star'></i>
                  </div>
               </div>
               <Link to={`/movie/${movie?.id}`}>
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

export default RelatedMovieItem;
