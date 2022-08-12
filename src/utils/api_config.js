export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = '1078551a914b522b8fbb7c1d436affa4';
const tmdbEndPoint = 'https://api.themoviedb.org/3/movie';
const searchEndPoint = 'https://api.themoviedb.org/3/search/movie';

export const tmdbAPI = {
   getListMovie: (type = 'popular', page = 1) => {
      return `${tmdbEndPoint}/${type}?api_key=${apiKey}&language=en-US&page=${page}`;
   },
   getMovieDetail: (movieId) => {
      return `${tmdbEndPoint}/${movieId}?api_key=${apiKey}&language=en-US`;
   },
   getImage: (type = 'original', url) => {
      return `http://image.tmdb.org/t/p/${type}${url}`;
   },
   // getCredits: (movieId = '') => {
   //    return `${tmdbEndPoint}/${movieId}/credits?api_key=${apiKey}`;
   // },
   // getVideos: (movieId = '') => {
   //    return `${tmdbEndPoint}/${movieId}/videos?api_key=${apiKey}`;
   // },
   getOthersOfMovie: (movieId = '', type = 'credits') => {
      return `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`;
   },
   getSearchMovie: (page = 1, query = '') => {
      return `${searchEndPoint}?api_key=${apiKey}&page=${page}&query=${query}`;
   },
};
