import styled from 'styled-components';
import { shade } from 'polished';
import SignUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
   display: flex;
   height: 100vh;
   align-items: stretch;
`;
export const Content = styled.div`
   display: flex;
   flex-direction: column;
   place-content: center;

   width: 100%;
   max-width: 700px;
   align-items: center;

   form {
      margin: 80px 0;
      width: 340px;
      text-align: center;

      h1 {
         margin-bottom: 24px;
      }
      a {
         color: #f4ede8;
         text-decoration: none;
         display: block;
         margin-top: 24px;
         transition: background 0.2s;

         &:hover {
            color: ${shade(0.2, '#f4ede8')};
         }
      }
   }

   > a {
      color: #f4ede8;
      text-decoration: none;
      margin-top: 24px;
      transition: background 0.2s;
      display: flex;
      align-items: center;

      &:hover {
         color: ${shade(0.2, '#f4ede8')};
      }

      svg {
         margin-right: 16px;
      }
   }
`;
export const Background = styled.div`
   flex: 1;
   background: url(${SignUpBackgroundImg}) no-repeat center;
   background-size: cover;
`;
