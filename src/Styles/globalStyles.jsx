import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: ${({theme}) => theme.mainFont};
        background-color: ${({theme}) => theme.mainBg};
        overflow-x: hidden;
    }


    input, button, select, option {
        font-family: ${({theme}) => theme.mainFont};
    }

`


export default GlobalStyles;