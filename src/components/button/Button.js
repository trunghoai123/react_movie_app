import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const ButtonStyles = styled.button`
   ${(props) =>
      props.disabled &&
      css`
         opacity: 0.5;
      `};
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   padding: 12px;
   column-gap: 12px;
   font-weight: 600;
   border-radius: 4px;
   ${(props) =>
      props.color === 'primary'
         ? css`
              // if color is primary -> return a button primary, else recives color and text to decord the button
              color: ${(props) => props.text};
              background: linear-gradient(
                 to right bottom,
                 ${(props) => props.theme.primary} 0%,
                 ${(props) => props.theme.primary_2} 100%
              );
           `
         : css`
              color: ${(props) => props.text};
              background-color: ${(props) => props.color}; ;
           `};
   /* ${(props) =>
      props.color === 'primary'
         ? css`
              color: ${(props) => props.text};
              background: linear-gradient(
                 to right bottom,
                 ${(props) => props.theme.primary} 0%,
                 ${(props) => props.theme.primary_2} 100%
              );
           `
         : css``}; */

   .loading {
      position: absolute;
      top: calc(50% - ${(props) => props.size / 2});
      left: calc(50% - ${(props) => props.size / 2});
      /* transform: translate(-50%, -50%); */
      animation: spinner 1s infinite linear;
      @keyframes spinner {
         100% {
            transform: rotate(360deg);
         }
      }
      width: ${(props) => props.size};
      height: ${(props) => props.size};
      border-radius: 50%;
      display: inline-block;
      border-bottom: ${(props) => props.borderSize} solid transparent;
      border-right: ${(props) => props.borderSize} solid
         ${(props) => props.theme.primary};
      border-left: ${(props) => props.borderSize} solid
         ${(props) => props.theme.primary};
      border-top: ${(props) => props.borderSize} solid
         ${(props) => props.theme.primary};
   }
`;

const Button = ({
   size = '15px',
   borderSize = '3px',
   isLoading = false,
   text = 'white',
   color = 'primary',
   className = '',
   type = 'button',
   children = '',
   ...props
}) => {
   return (
      <ButtonStyles
         size={size}
         borderSize={borderSize}
         text={text}
         color={color}
         type={type}
         className={`${className}`}
         {...props}
      >
         {isLoading ? <div className='loading'></div> : null}
         {children}
      </ButtonStyles>
   );
};
Button.propTypes = {
   size: PropTypes.string,
   borderSize: PropTypes.string,
   isLoading: PropTypes.bool,
   text: PropTypes.string,
   color: PropTypes.string,
   className: PropTypes.string,
   type: PropTypes.oneOf(['button', 'submit']),
};
export default Button;
