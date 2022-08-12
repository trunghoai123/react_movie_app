import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useHi } from 'react-router-dom';

const HomeSearchStyles = styled.div`
   padding: 0 0 0px 0;
   .search_actions {
      font-size: 14px;
      column-gap: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.inputText};
      input {
         padding: 12px;
         background-color: transparent;
         flex: 1;
         outline: none;
         color: ${(props) => props.theme.textSmoke};
      }
      i {
         color: ${(props) => props.theme.textSmoke};
         padding: 15.5px;
         cursor: pointer;
         :hover {
            font-weight: 900;
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
   }
`;

const HomeSearch = () => {
   const navigate = useNavigate();
   // const history = useHistory();
   const [query, setQuery] = useState('');
   const handleSetQuery = (e) => {
      setQuery(e.target.value);
   };
   const handleSearch = (e) => {
      e.preventDefault();
      if (query.trim() !== '') {
         navigate(`/movies/movies-list?query=${query}`);
      }
   };
   return (
      <HomeSearchStyles>
         <form onSubmit={handleSearch} className='search_actions'>
            <input
               onChange={(e) => handleSetQuery(e)}
               placeholder='Quick Search'
            />
            {query.trim() ? (
               <Link to={`/movies/movies-list?query=${query}`}>
                  <i className='fa-solid fa-magnifying-glass'></i>
               </Link>
            ) : (
               <i className='fa-solid fa-magnifying-glass'></i>
            )}
         </form>
      </HomeSearchStyles>
   );
};

export default HomeSearch;
