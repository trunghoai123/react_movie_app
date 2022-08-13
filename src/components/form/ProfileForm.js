import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../button/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '../input/TextInput';
import DatePicker from '../datePicker/DatePicker';
import Textarea from '../input/Textarea';
import ImagePicker from '../imagePicker.js/ImagePicker';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-app/fireabase-config';
import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
const ProfileFormStyles = styled.div`
   user-select: none;
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
   .field-center {
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .field {
      padding: 0 20px 0 20px;
      margin-top: 24px;
   }
   .fieldContainer {
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .fieldContainer .field {
      flex: 1;
   }
   // avatar
   /* .avt-label {
      border-radius: 50%;
   }
   .cur-avt {
      cursor: pointer;
      border-radius: 50%;
      width: 170px;
   } */
   //input fullname
   /* .text-input {
      background-color: ${(props) => props.theme.textSmoke};
      padding: 8px 12px;
      color: ${(props) => props.theme.inputText};
      font-weight: 500;
      outline: none;
      width: 100%;
      border: 2px solid ${(props) => props.theme.primary};
      border-radius: 4px;
   } */

   //button submit
   .submit-field {
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
      width: 200px;
      display: flex;
      justify-content: center;
   }
`;

const schema = yup.object({
   fullname: yup
      .string()
      .required('Fullname cannot be empty')
      .matches(
         /^\s*[a-zA-ZaAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+(\s[a-zA-ZaAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+)*\s*$/,
         'Fullname does not includes number, special charaters'
      ),
   phone: yup
      .string()
      .required('Phone Number cannot be empty')
      .matches(
         /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
         'Phone Number cannot contain special charaters, letters and only 10 numbers'
      ),
   dateofbirth: yup.string().required('Date of birth cannot be empty'),
});

const ProfileForm = () => {
   const { user, setUser } = useAuth();
   const { uid: userId } = useParams(); // user id
   const [selectedImg, setSelectedImg] = useState(null);
   const storage = getStorage();
   const metadata = {
      contentType: 'image/jpeg, image/jpg, image/png',
   };
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
         avatar: '',
         fullname: '',
         phone: '',
         dateofbirth: '',
         description: '',
      },
   });
   useEffect(() => {
      const collDocRef = doc(db, 'users', userId);
      getDoc(collDocRef).then((doc) => {
         const values = doc.data();
         reset({
            avatar: '',
            photoURL: values?.photoURL,
            fullname: values?.fullname,
            phone: values?.phone,
            dateofbirth: values?.dateofbirth,
            description: values?.description,
            // ...doc.data(),
         });
      });
   }, [reset, userId]);

   useEffect(() => {
      if (
         errors.fullname ||
         errors.phone ||
         errors.dateofbirth ||
         errors.description
      ) {
         toast.warning(
            errors?.fullname?.message ||
               errors?.phone?.message ||
               errors?.dateofbirth?.message ||
               errors?.description?.message
         );
      }
   }, [errors]);

   const handleSubmitForm = async (values) => {
      // console.log(user);
      // updateDoc(doc(db, 'users', 'AOoGGi9fmJlWjz7w8cpJ'), {
      //    ...values,
      //    photoURL: selectedImg || values?.photoURL || '',
      // });
      try {
         console.log(values);
         console.log('photoURL: ', values.photoURL);
         console.log('selectedImage: ', selectedImg);
         await updateDoc(doc(db, 'users', userId), {
            ...values,
            photoURL: selectedImg || values?.photoURL || '',
         });
         // setSelectedImg(null);
         // setValue('photoURL');
         window.location.reload(false);
      } catch (error) {
         console.log(error);
      }
   };
   const handleChangeImage = (e) => {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      const storageRef = ref(storage, 'images/' + uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case 'paused':
                  console.log('Upload is paused');
                  break;
               case 'running':
                  console.log('Upload is running');
                  break;
               default:
                  console.log('error case');
            }
         },
         (error) => {
            switch (error.code) {
               case 'storage/unauthorized':
                  break;
               case 'storage/canceled':
                  break;
               case 'storage/unknown':
                  break;
               default:
                  console.log('default error');
            }
         },
         () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setSelectedImg(downloadURL);
               console.log('File available at', downloadURL);
            });
         }
      );
   };
   return (
      <ProfileFormStyles>
         <form autoComplete='off' onSubmit={handleSubmit(handleSubmitForm)}>
            <div className='field field-center'>
               <ImagePicker
                  onChange={handleChangeImage}
                  url={selectedImg || user?.photoURL}
                  id='avatar'
                  control={control}
                  name='avatar'
               ></ImagePicker>
            </div>
            <div className='fieldContainer'>
               <div className='field'>
                  <label className='label' htmlFor='fullname'>
                     Fullname
                  </label>
                  <TextInput
                     placeholder='Nguyen Trung Hoai'
                     id='fullname'
                     control={control}
                     name='fullname'
                  ></TextInput>
               </div>
               <div className='field'>
                  <label className='label' htmlFor='phone'>
                     Phone Number
                  </label>
                  <TextInput
                     placeholder='0906461526'
                     id='phone'
                     control={control}
                     name='phone'
                  ></TextInput>
               </div>
            </div>
            <div className='fieldContainer'>
               <div className='field'>
                  <label className='label' htmlFor='phone'>
                     Date of Birth
                  </label>
                  <DatePicker
                     type='date'
                     control={control}
                     id='dateofbirth'
                     name='dateofbirth'
                     min='1900-01-01'
                     max='2022-12-31'
                  ></DatePicker>
               </div>
               <div className='field'>
                  <label className='label' htmlFor='description'>
                     Description
                  </label>
                  <Textarea
                     placeholder='Describe Yourself...'
                     id='description'
                     control={control}
                     rows='4'
                     name='description'
                  ></Textarea>
               </div>
            </div>
            <div className='submit-field'>
               <Button type='submit'>Update</Button>
            </div>
         </form>
      </ProfileFormStyles>
   );
};

ProfileForm.propTypes = {};

export default ProfileForm;
