import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import { buttonColor, buttonText } from '../utils/constant';
import { useController, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase-app/fireabase-config';
import {
   signInWithEmailAndPassword,
   signInWithPopup,
   GoogleAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const SignInStyles = styled.div`
   .signin_form {
      width: 80%;
      margin: auto;
   }
   .signin_container {
      padding: 80px 0 80px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 12px;
      margin: auto;
   }
   .signin_actions {
      /* background-color: white; */
      width: 35%;
      border-radius: 5px;
      height: 450px;
   }
   .signin_banner {
      width: 65%;
   }
   .app_name {
      width: 85%;
      margin: auto;
      font-weight: 700;
      text-align: center;
      font-size: 30px;
      margin-bottom: 30px;
      background: linear-gradient(
         to right bottom,
         ${(props) => props.theme.primary} 0%,
         ${(props) => props.theme.primary_2} 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      /* background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
      background-clip: text;
      color: transparent; */

      /* background: linear-gradient(to bottom right, #eee, #333);
      background-clip: text;
      -webkit-text-fill-color: transparent; */
   }
   .field {
      margin-bottom: 18px;
   }
   .options {
      font-size: 13px;
      font-weight: 500;
      text-align: center;
      margin-top: 4px;
      color: ${(props) => props.theme.inputText};
   }
   .term {
      font-size: 13px;
      font-weight: 500;
      text-align: center;
      color: ${(props) => props.theme.textColorBlurer};
   }
   .image {
      border-radius: 5px;
      object-fit: contain;
      /* height: 450px; */
   }
   .signup {
      font-size: 13px;
      .question {
      }
      .go_signup {
         color: blue;
         text-decoration: underline;
         cursor: pointer;
      }
   }
`;

const schema = yup.object({
   email: yup
      .string()
      .email('Please enter correct email')
      .required('Email has not to empty'),
   password: yup
      .string()
      .required('Password has not to empty')
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
         'Password must contains 1 char, 1 num, 1 upper case, 1 lower case and minimum 8 chars'
      ),
});

const SignIn = () => {
   const navigate = useNavigate();
   const { user } = useAuth();
   const {
      handleSubmit,
      control,
      reset,
      setValue,
      getValues,
      formState: { isSubmitting, errors },
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   useEffect(() => {
      if (user && user?.uid) {
         navigate('/');
      }
   }, [navigate, user]);

   useEffect(() => {
      if (errors.email || errors.password) {
         toast.warning(errors?.email?.message || errors?.password?.message);
      }
      // console.log(prevErrors.current);
      // console.log(errors);
   }, [errors]);
   const handleSignIn = async (values) => {
      try {
         await signInWithEmailAndPassword(auth, values.email, values.password);
         navigate('/');
         toast.success('you are logged in');
      } catch (err) {
         const errObj = Object.values(err);
         // if (errObj[0] === 'auth/email-already-in-use') {
         //    toast.error(`Email ${values.email} has already in use`);
         if (errObj[0] === 'auth/user-not-found') {
            toast.error(`Email has not found`);
         } else if (errObj[0] === 'auth/wrong-password') {
            toast.error(`Password incorrect`);
         }
      }
      // const err = Object.values(error);
      // if(err[0] === ('auth/email-already-in-use')){
      //       toast.error(`Email ${values.email} has already in use`);
      // }
   };
   const handleGooglePopup = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
         .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
         })
         .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
         });
   };
   return (
      <SignInStyles>
         <div className='container-fluid signin_container'>
            <div className='signin_actions'>
               <div className='app_name'>
                  <h1>KeyPlus Play</h1>
               </div>
               <form
                  autoComplete='off'
                  onSubmit={handleSubmit(handleSignIn)}
                  className='signin_form'
               >
                  <div className='field'>
                     <Input
                        type='email'
                        placeholder='Email'
                        name='email'
                        id='email'
                        control={control}
                     ></Input>
                  </div>
                  <div className='field'>
                     <Input
                        type='password'
                        placeholder='Password'
                        name='password'
                        id='password'
                        control={control}
                     ></Input>
                  </div>
                  <div className='field signup'>
                     <span className='question'>
                        Do you have an account yet?
                     </span>
                     <Link to={'/sign-up'} className='go_signup'>
                        Sign Up
                     </Link>
                  </div>
                  <div className='field'>
                     <Button
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        type='submit'
                     >
                        <span>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth='2'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                              />
                           </svg>
                        </span>
                        Login Now
                     </Button>
                  </div>
                  <hr></hr>
                  <div className='field options'>Or sign in with Google</div>
                  <div className='field'>
                     <Button
                        onClick={handleGooglePopup}
                        color={buttonColor.smoke}
                        text={buttonText.dark}
                     >
                        <i className='fa-brands fa-google'></i>
                        Sign In With Google
                     </Button>
                  </div>
                  <div className='term'>
                     I agree to abide by KeyPlus Play Terms of Service as Pivacy
                     Policy
                  </div>
               </form>
            </div>
            <div className='signin_banner'>
               <div className='image_container'>
                  <img className='image' srcSet='avengers_signin.jpg' alt='' />
               </div>
            </div>
         </div>
      </SignInStyles>
   );
};

export default SignIn;
