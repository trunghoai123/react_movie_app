import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/button/Button';
import SideMovieItem from '../components/movies/SideMovieItem';
import SideMovieList from '../components/movies/SideMovieList';
import HomeSearch from '../components/search/HomeSearch';

const SideListStyles = styled.div`
   overflow: auto;
   width: 24%;
   padding: 20px 0 0 12px;
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
   .side_title {
      padding: 20px 0 0 0;
      font-size: 18px;
      color: ${(props) => props.theme.textSmoke};
      font-weight: 500;
   }
`;

const SideList = () => {
   return (
      <SideListStyles>
         <HomeSearch></HomeSearch>
         <div className='side_movies-list'>
            <h1 className='side_title'>Upcoming Movies</h1>
            <SideMovieList type='upcoming'></SideMovieList>
            <NavLink to={'/movies/movies-list'}>
               <Button>See more</Button>
            </NavLink>
         </div>
      </SideListStyles>
   );
};

export default SideList;
