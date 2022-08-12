import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/constant';
import { GlobalStyles } from './styles/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
const root = createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <GlobalStyles></GlobalStyles>
         <BrowserRouter>
            <AuthProvider>
               <App />
            </AuthProvider>
            <ToastContainer
               theme='dark'
               autoClose={2000}
               limit={4}
            ></ToastContainer>
         </BrowserRouter>
      </ThemeProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
