import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import HomeMain from '../layout/HomeMain';
import SideList from '../layout/SideList';
import SideMenu from '../layout/SideMenu';

const HomeStyles = styled.div`
   height: 100vh;
   background-color: ${(props) => props.theme.bgSideBar};
   .home_container {
      display: flex;
      margin: auto;
      height: 100%;
   }
`;

const Home = () => {
   const navigate = useNavigate();
   const { user } = useAuth();
   useEffect(() => {
      if (!user) {
         navigate('/sign-in');
      }
   }, [navigate, user]);
   return (
      <HomeStyles>
         <div className='home_container container-95'>
            <SideMenu></SideMenu>
            <HomeMain></HomeMain>
            <SideList></SideList>
         </div>
      </HomeStyles>
   );
};

export default Home;
