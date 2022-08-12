import React from 'react';
import styled from 'styled-components';

const ActionsStyles = styled.div`
   padding: 20px 0 16px 0;
   display: flex;
   justify-content: space-between;
   align-items: center;
   .movies_title {
      color: ${(props) => props.theme.textSmoke};
      font-size: 18px;
      font-weight: 500;
   }
   .movies_control {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 6px;
      i {
         cursor: pointer;
         width: 24px;
         height: 24px;
         text-align: center;
         line-height: 24px;
         border-radius: 100%;
         color: ${(props) => props.theme.textSmoke};
         background-color: ${(props) => props.theme.inputText};
      }
   }
`;

const Actions = ({ title = '' }) => {
   return (
      <ActionsStyles>
         <h1 className='movies_title'>{title}</h1>
         <div className='movies_control'>
            <i className='fa-solid fa-angle-left'></i>
            <i className='fa-solid fa-angle-right'></i>
         </div>
      </ActionsStyles>
   );
};

export default Actions;
