import React from 'react';
import styled from 'styled-components';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';

const InputStyles = styled.input`
   width: 100%;
   padding: 12px;
   outline: none;
   background-color: ${(props) => props.theme.inputColor};
   color: ${(props) => props.theme.inputText};
   border-radius: 4px;
   transition: all ease 300ms;
   :focus {
      background-color: ${(props) => props.theme.inputColorHover};
   }
   :hover {
      background-color: ${(props) => props.theme.inputColorHover};
   }
`;

const Input = ({
   type = 'text',
   className = '',
   control = null,
   name = '',
   placeholder = '',
   ...props
}) => {
   const { field } = useController({ control, name, defaultValue: '' });
   return (
      <InputStyles
         {...field}
         {...props}
         type={type}
         placeholder={placeholder}
         className={`${className}`}
      ></InputStyles>
   );
};
Input.propTypes = {
   type: PropTypes.oneOf(['text', 'email', 'password']),
   className: PropTypes.string,
   control: PropTypes.object,
   name: PropTypes.string,
   placeholder: PropTypes.string,
};
export default Input;
