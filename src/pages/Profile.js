import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SideMenu from '../layout/SideMenu';
import ProfileMain from '../layout/ProfileMain';

const ProfileStyles = styled.div`
   height: 100vh;
   background-color: ${(props) => props.theme.bgSideBar};
   .home_container {
      display: flex;
      margin: auto;
      height: 100%;
   }
`;

const Profile = (props) => {
   return (
      <ProfileStyles>
         <div className='home_container container-95'>
            <SideMenu></SideMenu>
            <ProfileMain></ProfileMain>
         </div>
      </ProfileStyles>
   );
};

Profile.propTypes = {};

export default Profile;
