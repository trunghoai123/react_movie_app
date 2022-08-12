import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBarStyles = styled.div`
   padding-bottom: 18px;
   .center_nav-item {
      font-weight: 700;
      font-size: 15px;
      color: ${(props) => props.theme.textGrayLight};
      padding: 0 8px 0 8px;
   }
   .focus_link {
      background: linear-gradient(
         to right bottom,
         ${(props) => props.theme.primary} 0%,
         ${(props) => props.theme.primary_2} 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
   }
`;

const NavBar = () => {
   return (
      <NavBarStyles className='center_navbar'>
         <NavLink
            to={'/tvseries'}
            className={({ isActive }) => (isActive ? 'focus_link' : '')}
         >
            <span className='center_nav-item'>TV Series</span>
         </NavLink>
         <NavLink
            to={'/movies/movies-list'}
            className={({ isActive }) => (isActive ? 'focus_link' : '')}
         >
            <span className='center_nav-item'>Movies</span>
         </NavLink>
         <NavLink
            to={'/anime'}
            className={({ isActive }) => (isActive ? 'focus_link' : '')}
         >
            <span className='center_nav-item'>Anime</span>
         </NavLink>
      </NavBarStyles>
   );
};

export default NavBar;
