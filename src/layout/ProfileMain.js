import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavBar from './NavBar';
import ProfileForm from '../components/form/ProfileForm';

const ProfileMainStyles = styled.div`
   color: ${(props) => props.theme.textSmoke};
   padding: 20px 0 0 20px;
   width: 84%;
   overflow-y: auto;
   ::-webkit-scrollbar {
      width: 4px;
   }
   ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
      background: ${(props) => props.theme.bgSideBar};
   }
   ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.bgSideBar};
      border-radius: 10px;
   }
`;

const ProfileMain = (props) => {
   return (
      <ProfileMainStyles>
         <NavBar></NavBar>
         <ProfileForm></ProfileForm>
      </ProfileMainStyles>
   );
};

ProfileMain.propTypes = {};

export default ProfileMain;
