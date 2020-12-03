import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;

   }

   body {
      background-color: #312E38;
      color: #ffff;
      -webkit-font-smoothing: antialiased;

   }

   border-style,input, button {
      font-family: 'Roboto Slab', serif;
      font-size: 16px;

   }
   h1, h2 , h3, h4, h6, strong, span, a, p {
      font-weight: 500;
      font-family: 'Roboto Slab', serif;
   }

   button {
      cursor: pointer;
   }
`;
