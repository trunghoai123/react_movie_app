import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { auth, db } from '../firebase-app/fireabase-config';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const SideMenuStyles = styled.div`
   user-select: none;
   overflow: auto;
   width: 16%;
   padding: 20px 0 0 0;
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
   .side_movies {
      width: 24%;
   }
   .app_name {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      column-gap: 12px;
      width: 100%;
      margin: auto;
      font-weight: 700;
      font-size: 20px;
      background: linear-gradient(
         to right bottom,
         ${(props) => props.theme.primary} 0%,
         ${(props) => props.theme.primary_2} 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      i {
         font-size: 26px;
      }
   }
   .sidebar_title {
      padding-top: 24px;
      color: ${(props) => props.theme.inputText};
      font-size: 10px;
      letter-spacing: 2px;
      font-weight: 500;
   }
   .sidebar_item {
      padding: 4px 0 4px 12px;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 500;
      color: ${(props) => props.theme.textSmoke};
   }
   .sidebar_item--text {
      color: ${(props) => props.theme.textSmoke};
   }
   .side_item--icon {
      width: 26px;
   }
   .user-image {
      width: 34px;
      height: 34px;
      object-fit: cover;
      margin-right: 12px;
      border-radius: 50%;
   }
   .user_name {
      display: flex;
      align-items: center;
      margin-top: 12px;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }

   .welcome_name {
      width: 150px;
      font-size: 15px;
      font-weight: 600;
      background: linear-gradient(
         to right bottom,
         ${(props) => props.theme.primary} 0%,
         ${(props) => props.theme.primary_2} 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
   .focus_link {
      div {
         font-weight: 800;
         background: linear-gradient(
            to right bottom,
            ${(props) => props.theme.primary} 0%,
            ${(props) => props.theme.primary_2} 100%
         );
         background-clip: text;
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
      }
   }
`;

const SideMenu = () => {
   const handleLogout = () => {
      auth.signOut();
      toast.success('your are logged out');
   };
   const { user } = useAuth();
   // console.log(user);
   // useEffect(() => {
   //    const getUserDoc = async () => {
   //       const colRef = doc(db, 'users', user.uid);
   //       const docData = await getDoc(colRef);
   //       console.log(docData.data());
   //    };
   //    getUserDoc();
   // });

   // setValue("category", {
   //    id: docData.id,
   //    ...docData.data(),
   //  });
   //  setSelectCategory(item);
   return (
      <SideMenuStyles>
         <NavLink to={'/'}>
            <div className='app_name'>
               <h1>KeyPlus Play</h1>
               <i className='fa-regular fa-circle-play'></i>
            </div>
         </NavLink>
         <div className='user_name'>
            <Link to={`/profile/${user?.uid}`}>
               <img
                  className='user-image'
                  src={
                     user?.photoURL ||
                     'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  }
                  alt=''
               />
            </Link>
            <div title={user?.displayName || ''} className='welcome_name'>
               {user?.displayName || 'Anonymous'}
            </div>
         </div>
         <div className='sidebar_block'>
            <div className='sidebar_title'>MENU</div>
            <div className='sidebar_items'>
               <NavLink
                  to={'/'}
                  className={({ isActive }) => (isActive ? 'focus_link' : '')}
               >
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-house'></i>
                     </span>
                     <span className='sidebar_item--text'>Home</span>
                  </div>
               </NavLink>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-users'></i>
                     </span>
                     <span className='sidebar_item--text'>Comunity</span>
                  </div>
               </NavLink>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-compass'></i>
                     </span>
                     <span className='sidebar_item--text'>Discover</span>
                  </div>
               </NavLink>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-medal'></i>
                     </span>
                     <span className='sidebar_item--text'>Award</span>
                  </div>
               </NavLink>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-user'></i>
                     </span>
                     <span className='sidebar_item--text'>Celebs</span>
                  </div>
               </NavLink>
            </div>
         </div>
         <div className='sidebar_block'>
            <div className='sidebar_title'>LYBRARY</div>
            <div className='sidebar_items'>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-clock'></i>
                     </span>
                     <span className='sidebar_item--text'>Recent</span>
                  </div>
               </NavLink>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-star'></i>
                     </span>
                     <span className='sidebar_item--text'>Top rated</span>
                  </div>
               </NavLink>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-circle-down'></i>
                     </span>
                     <span className='sidebar_item--text'>Download</span>
                  </div>
               </NavLink>
            </div>
         </div>
         <div className='sidebar_block'>
            <div className='sidebar_title'>CATEGORIES</div>
            <div className='sidebar_items'>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-clock'></i>
                     </span>
                     <span className='sidebar_item--text'>TV Series</span>
                  </div>
               </NavLink>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-circle-play'></i>
                     </span>
                     <span className='sidebar_item--text'>Movies</span>
                  </div>
               </NavLink>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-video'></i>
                     </span>
                     <span className='sidebar_item--text'>Anime</span>
                  </div>
               </NavLink>
            </div>
         </div>
         <div className='sidebar_block'>
            <div className='sidebar_title'>GENERAL</div>
            <div className='sidebar_items'>
               <NavLink to={'/'}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-gear'></i>
                     </span>
                     <span className='sidebar_item--text'>Settings</span>
                  </div>
               </NavLink>
               <Link to={'/sign-in'} onClick={handleLogout}>
                  <div className='sidebar_item'>
                     <span className='side_item--icon'>
                        <i className='fa-solid fa-right-from-bracket'></i>
                     </span>
                     <span className='sidebar_item--text'>Log out</span>
                  </div>
               </Link>
            </div>
         </div>
      </SideMenuStyles>
   );
};

export default SideMenu;
