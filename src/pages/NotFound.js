import React from 'react';
import SideMenu from '../layout/SideMenu';
import styled from 'styled-components';
import NavBar from '../layout/NavBar';
import Button from '../components/button/Button';
import { Link } from 'react-router-dom';
const NotFoundStyles = styled.div`
   user-select: none;
   height: 100vh;
   background-color: ${(props) => props.theme.bgSideBar};
   .home_container {
      display: flex;
      margin: auto;
      height: 100%;
   }
   .notfound-main {
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
   }
   .notfound-content {
      text-align: center;
      padding-top: 60px;
   }
   .oops {
      font-size: 40px;
      font-weight: 700;
   }
   .err-number {
      font-size: 95px;
      font-weight: 700;
      line-height: 95px;
      background: linear-gradient(
         to right bottom,
         ${(props) => props.theme.primary} 0%,
         ${(props) => props.theme.primary_2} 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
   }
   .text-err {
   }
   .button-container {
      width: 280px;
      margin: 40px auto 0 auto;
   }
`;
const NotFound = (props) => {
   return (
      <NotFoundStyles>
         <div className='home_container container-95'>
            <SideMenu></SideMenu>
            <div className='notfound-main'>
               <NavBar></NavBar>
               <div className='notfound-content'>
                  <div className='oops'>Oops!</div>
                  <div className='err-number'>404</div>
                  <div className='text-err'>PAGE NOT FOUND</div>
               </div>
               <div className='button-container'>
                  <Link to={'/'}>
                     <Button>Back to Home</Button>
                  </Link>
               </div>
            </div>
         </div>
      </NotFoundStyles>
   );
};
export default NotFound;
