import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import useSWR from 'swr';
import styled from 'styled-components';
import { fetcher, tmdbAPI } from '../../utils/api_config';

const VideoListStyles = styled.div`
   user-select: none;
   width: 620px;
   margin: auto;
   iframe {
      width: 100%;
      height: 360px;
   }
   .swiper-button-next,
   .swiper-button-prev {
      ::after {
         font-weight: 800;
         font-size: 26px;
      }
   }
`;

const VideoList = ({ movieId = '' }) => {
   const { data, error } = useSWR(
      tmdbAPI.getOthersOfMovie(movieId, 'videos'),
      fetcher
   );
   if (!data || error) return null;
   return (
      <VideoListStyles className='videos'>
         <Swiper
            loopFillGroupWithBlank={true}
            loop={true}
            pagination={{
               clickable: true,
               dynamicBullets: true,
            }}
            navigation={true}
            modules={[Navigation, Pagination]}
            className='mySwiper'
         >
            {data?.results < 1 ? (
               <SwiperSlide>
                  <iframe
                     src='https://www.youtube.com/embed/NSsLMeWpq1k'
                     title='Hà Nội nghiêm cấm tùy tiện tăng học phí lái xe | VTV24'
                     frameBorder='0'
                     allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                     allowFullScreen
                  ></iframe>
               </SwiperSlide>
            ) : (
               data?.results.map((video) => {
                  return (
                     <SwiperSlide key={video.id}>
                        <iframe
                           key={video.id}
                           src={`https://www.youtube.com/embed/${video?.key}`}
                           title={video?.name}
                           frameBorder='0'
                           allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                           allowFullScreen
                        ></iframe>
                     </SwiperSlide>
                  );
               })
            )}
         </Swiper>
      </VideoListStyles>
   );
};

export default VideoList;
