import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useController } from 'react-hook-form';
const TextInputStyles = styled.input`
   background-color: ${(props) => props.theme.textSmoke};
   padding: 8px 12px;
   color: ${(props) => props.theme.inputText};
   font-weight: 500;
   outline: none;
   width: 100%;
   border: 2px solid ${(props) => props.theme.primary};
   border-radius: 4px;
`;

const TextInput = ({
   type = 'text',
   className = '',
   control = null,
   name = '',
   placeholder = '',
   ...props
}) => {
   const { field } = useController({ control, name, defaultValue: '' });
   return (
      <TextInputStyles
         {...field}
         {...props}
         type={type}
         placeholder={placeholder}
         className={`${className}`}
      ></TextInputStyles>
   );
};

TextInput.propTypes = {};

export default TextInput;
