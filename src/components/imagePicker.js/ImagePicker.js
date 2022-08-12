import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useController } from 'react-hook-form';
const ImagePickerStyles = styled.div`
   .avt-label {
      border-radius: 50%;
   }
   .cur-avt {
      cursor: pointer;
      border-radius: 50%;
      width: 170px;
      height: 170px;
      object-fit: cover;
   }
`;

const ImagePicker = ({
   onChange = () => {},
   id = '',
   url = '',
   className = '',
   control = null,
   name = '',
   placeholder = '',
   ...props
}) => {
   const { field } = useController({ control, name, defaultValue: '' });
   return (
      <ImagePickerStyles
         {...field}
         {...props}
         placeholder={placeholder}
         className={`${className}`}
      >
         <label className='label avt-label' htmlFor={id}>
            <img
               className='cur-avt'
               src={
                  url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
               }
               alt='avatar'
            />
         </label>
         <input
            onChange={onChange}
            name={name}
            id={id}
            className='hidden'
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            control={control}
         />
      </ImagePickerStyles>
   );
};

ImagePicker.propTypes = {};

export default ImagePicker;
