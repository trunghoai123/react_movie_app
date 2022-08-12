import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import { buttonColor, buttonText } from '../utils/constant';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../firebase-app/fireabase-config';
import {
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   updateProfile,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
const SignUpStyles = styled.div`
   .signup_form {
      width: 80%;
      margin: auto;
   }
   .signup_container {
      padding: 80px 0 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 12px;
      margin: auto;
   }
   .signup_actions {
      /* background-color: white; */
      width: 35%;
      border-radius: 5px;
      height: 450px;
   }
   .signup_banner {
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
   .signin {
      font-size: 13px;
      .question {
      }
      .go_signin {
         color: blue;
         text-decoration: underline;
         cursor: pointer;
      }
   }
`;

const schema = yup.object({
   fullname: yup
      .string()
      .required('Fullname does not to empty')
      .matches(
         /^\s*[a-zA-Z]+(\s[a-zA-Z]+)*\s*$/,
         'Fullname does not includes number, special charaters'
      ),
   email: yup
      .string()
      .email('Please enter correct email')
      .required('Email does not to empty'),
   password: yup
      .string()
      .required('Password does not to empty')
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
         'Password must contains 1 char, 1 num, 1 upper case, 1 lower case and minimum 8 chars'
      ),
});

const SignUp = (props) => {
   const navigate = useNavigate();
   // const { user } = useAuth();
   // console.log(user);
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
         fullname: '',
         email: '',
         password: '',
         cnfpassword: '',
      },
   });

   // useEffect(() => {
   //    if (user) {
   //       navigate('/');
   //    }
   // }, [navigate, user]);
   useEffect(() => {
      if (errors.fullname || errors.email || errors.password) {
         toast.warning(
            errors?.fullname?.message ||
               errors?.email?.message ||
               errors?.password?.message
         );
      } else {
         if (getValues('password') !== getValues('cnfpassword')) {
            toast.warning('Confirm password is incorrect');
         }
      }
      // console.log(prevErrors.current);
      // console.log(errors);
   }, [errors, getValues]);
   const handleSignUp = async (values) => {
      try {
         // check confirm password
         if (getValues('password') === getValues('cnfpassword')) {
            await createUserWithEmailAndPassword(
               auth,
               values.email,
               values.password
            );
            await updateProfile(auth.currentUser, {
               displayName: values.fullname,
            });
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
               fullname: values.fullname,
               email: values.email,
               // password: values.password,
            });
            navigate('/');
            toast.success('You are logged in');
         }
      } catch (err) {
         const errObj = Object.values(err);
         if (errObj[0] === 'auth/email-already-in-use') {
            toast.error(`Email ${values.email} already in use`);
         }
      }
   };
   return (
      <SignUpStyles>
         <div className='container-fluid signup_container'>
            <div className='signup_actions'>
               <div className='app_name'>
                  <h1>KeyPlus Play</h1>
               </div>
               <form
                  autoComplete='off'
                  onSubmit={handleSubmit(handleSignUp)}
                  className='signup_form'
               >
                  <div className='field'>
                     <Input
                        type='text'
                        placeholder='Fullname'
                        name='fullname'
                        id='fullname'
                        control={control}
                     ></Input>
                  </div>
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
                  <div className='field'>
                     <Input
                        type='password'
                        placeholder='Confirm Password'
                        name='cnfpassword'
                        id='cnfpassword'
                        control={control}
                     ></Input>
                  </div>
                  <div className='field signin'>
                     <span className='question'>
                        You have an account already?
                     </span>
                     <Link to={'/sign-in'} className='go_signin'>
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
                                 d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                              />
                           </svg>
                        </span>
                        Sign Up
                     </Button>
                  </div>
                  <div className='term'>
                     I agree to abide by KeyPlus Play Terms of Service as Pivacy
                     Policy
                  </div>
               </form>
            </div>
            <div className='signup_banner'>
               <div className='image_container'>
                  <img className='image' srcSet='avengers_signin.jpg' alt='' />
               </div>
            </div>
         </div>
      </SignUpStyles>
   );
};

export default SignUp;
