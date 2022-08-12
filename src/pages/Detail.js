import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import DetailMain from '../layout/DetailMain';
import SideList from '../layout/SideList';
import SideMenu from '../layout/SideMenu';

const DetailStyles = styled.div`
   height: 100vh;
   background-color: ${(props) => props.theme.bgSideBar};
   .detail_container {
      display: flex;
      margin: auto;
      height: 100%;
   }
`;

const Detail = () => {
   //get params and handle fetch values into DetailMain component
   const navigate = useNavigate();
   const { user } = useAuth();
   useEffect(() => {
      if (!user) {
         navigate('/sign-in');
      }
   }, [navigate, user]);
   return (
      <DetailStyles>
         <div className='detail_container container-95'>
            <SideMenu></SideMenu>
            {/* <HomeMain></HomeMain> */}
            <DetailMain></DetailMain>
            <SideList></SideList>
         </div>
      </DetailStyles>
   );
};

export default Detail;
