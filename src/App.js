import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Detail from './pages/Detail';
import Movies from './pages/Movies';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
   return (
      <Fragment>
         <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
            <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
            <Route path='/movie/:slug' element={<Detail></Detail>}></Route>
            <Route
               path='/movies/movies-list'
               element={<Movies></Movies>}
            ></Route>
            <Route path='/profile/:uid' element={<Profile></Profile>}></Route>
            <Route path='*' element={<NotFound></NotFound>}></Route>
         </Routes>
      </Fragment>
   );
}

export default App;
