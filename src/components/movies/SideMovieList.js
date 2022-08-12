import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../utils/api_config';
import SideMovieItemSkl from '../loadingSkeleton/SideMovieItemSkl';
import SideMovieItem from './SideMovieItem';

const SideMovieListStyles = styled.div`
   .side_title {
      padding: 20px 0 0 0;
      font-size: 18px;
      color: ${(props) => props.theme.textSmoke};
      font-weight: 500;
   }
`;

const SideMovieList = ({ children, type = 'upcoming', ...props }) => {
   const { data, error } = useSWR(tmdbAPI.getListMovie(type, 1), fetcher);
   const [movies, setMovies] = useState([]);
   useEffect(() => {
      if (data?.results) {
         setMovies(data?.results);
      }
   }, [data]);
   return (
      <SideMovieListStyles>
         {movies.length === 0 &&
            new Array(3).fill(0).map((item, index) => {
               return <SideMovieItemSkl key={index}></SideMovieItemSkl>;
            })}
         {movies.length > 3
            ? movies.slice(0, 3).map((item) => {
                 // if length > 3 then render 3 items, else render all
                 return (
                    <SideMovieItem key={item.id} item={item}></SideMovieItem>
                 );
              })
            : movies.map((item) => {
                 return (
                    <SideMovieItem key={item.id} item={item}></SideMovieItem>
                 );
              })}
      </SideMovieListStyles>
   );
};

export default SideMovieList;
