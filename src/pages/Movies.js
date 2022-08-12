import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useSWR from 'swr';
import MovieItem from '../components/movies/MovieItem';
import { useAuth } from '../contexts/AuthContext';
import NavBar from '../layout/NavBar';
import SideMenu from '../layout/SideMenu';
import { fetcher, tmdbAPI } from '../utils/api_config';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';
import MovieIListtemSkl from '../components/loadingSkeleton/MovieListItemSkl';
const MoviesStyles = styled.div`
   height: 100vh;
   background-color: ${(props) => props.theme.bgSideBar};
   .detail_container {
      display: flex;
      margin: auto;
      height: 100%;
   }
   .main_right--layout {
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
      overflow: auto;
      padding: 20px;
      width: 84%;
      background-color: ${(props) => props.theme.bgHomeMain};
      .pagination {
         padding: 30px 0 0 0;
         display: flex;
         justify-content: center;
         align-items: center;
         column-gap: 6px;
         li {
            padding: 3px 4px;
            font-size: 15px;
            font-weight: 500;
            color: ${(props) => props.theme.textSmoke};
            &.selected {
               font-weight: 600;
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
   }
   .movies_container {
      .search_container {
         .search_box {
            margin-left: auto;
            margin-right: auto;
            width: 600px;
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 12px;
            padding: 6px 12px;

            border: 10px solid;
            border-radius: 5px;
            border-image-slice: 1;
            border-width: 3px;
            border-image-source: linear-gradient(
               to right bottom,
               ${(props) => props.theme.primary},
               ${(props) => props.theme.primary_2}
            );

            input {
               background-color: transparent;
               flex: 1;
               outline: none;
               font-weight: 500;
               letter-spacing: 1.1px;
               color: ${(props) => props.theme.textSmoke};
            }
            i {
               font-size: 18px;
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
      .movies_list-item {
         padding: 40px 0 0 0;
         display: grid;
         grid-column-gap: 12px;
         grid-row-gap: 28px;
         grid-template-columns: repeat(5, minmax(0, 1fr));
      }
   }
`;
const itemsPerPage = 20;
const Movies = () => {
   const [values] = useSearchParams();
   useEffect(() => {
      if (values.get('query')) {
         document.body.querySelector(
            '.detail_container .search_input-list'
         ).value = values.get('query');
      }
   }, [values]);
   const [filter, setFilter] = useState(values.get('query') || '');
   const [curPage, setCurPage] = useState(1);
   const [url, setUrl] = useState(tmdbAPI.getListMovie('popular', curPage));
   const { data, error } = useSWR(url, fetcher);
   useEffect(() => {
      if (filter.trim() !== '') {
         setUrl(tmdbAPI.getSearchMovie(curPage, filter));
      } else {
         setUrl(tmdbAPI.getListMovie('popular', curPage));
      }
   }, [curPage, filter]);

   // We start with an empty list of items.
   // const [currentItems, setCurrentItems] = useState(null);
   const [pageCount, setPageCount] = useState(0);
   // Here we use item offsets; we could also use page offsets
   // following the API or data you're working with.
   // const [pageOffset, setPageOffset] = useState(0);

   useEffect(() => {
      setPageCount(data?.total_pages || 0);

      // Fetch items from another resources.
      // setUrl(tmdbAPI.getSearchMovie(curPage, filter));
   }, [data]);
   useEffect(() => {
      document.querySelector('.main_right--layout').scrollTo(0, 0);
      // .scrollIntoView({ behavior: 'smooth', block: 'start' });
   }, [curPage]);
   // Invoke when user click to request another page.
   const handlePageClick = (event) => {
      setCurPage(event.selected + 1);
      // const newOffset = event.selected % data.total_pages;
      // setPageOffset(newOffset);
   };
   const handleSetFilter = debounce((e) => {
      setFilter(e.target.value.trim());
      setCurPage(1);
      // delete className of before selected item pagination
      // document.querySelector(
      //    `.main_right--layout .pagination li:nth-child(${curPage + 1})`
      // ).className = '';
      //set className is selected for the firt item pagination
      // document.querySelector(
      //    `.main_right--layout .pagination li:nth-child(2)`
      // ).className = 'selected';
      // console.log(
      //    document.querySelector(
      //       `.main_right--layout .pagination li:nth-child(${curPage + 1})`
      //    )
      // );
      // console.log(curPage);
   }, 500);

   const movies = data?.results || [];
   const { user } = useAuth();
   const navigate = useNavigate();
   useEffect(() => {
      if (!user) {
         navigate('/sign-in');
      }
   }, [navigate, user]);

   // if (!data || error) return null;
   return (
      <MoviesStyles>
         <div className='detail_container container-95'>
            <SideMenu></SideMenu>
            <div className='main_right--layout'>
               <NavBar></NavBar>
               <div className='movies_container'>
                  <div className='search_container'>
                     <div className='search_box'>
                        <input
                           className='search_input-list'
                           onChange={(e) => handleSetFilter(e)}
                           type='text'
                           placeholder='Type movie name...'
                        />
                        <div>
                           <i className='fa-solid fa-magnifying-glass'></i>
                        </div>
                     </div>
                  </div>
                  <div className='movies_list-item'>
                     {movies.length > 0
                        ? movies.map((item) => {
                             return (
                                <MovieItem
                                   key={item?.id}
                                   item={item}
                                ></MovieItem>
                             );
                          })
                        : new Array(40).fill(0).map((item, index) => {
                             return (
                                <MovieIListtemSkl
                                   key={index}
                                ></MovieIListtemSkl>
                             );
                          })}
                  </div>
               </div>
               <ReactPaginate
                  className='pagination'
                  breakLabel='...'
                  nextLabel={<i className='fa-solid fa-angle-right'></i>}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel={<i className='fa-solid fa-angle-left'></i>}
                  renderOnZeroPageCount={null}
               />
            </div>
         </div>
      </MoviesStyles>
   );
};

export default Movies;
