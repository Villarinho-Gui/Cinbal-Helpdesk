import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        background: #FBFBFB;
        color: black;
        font-size: 1rem/** 16px */ !important;
        line-height: 1.5rem/** 24px */ !important;
        font-weight: 400 !important;
        letter-spacing: normal !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
        transition-duration: 200ms;
        outline-width: 0px;
    }

    body, input, text-area, button{
        font-family: 'Nunito Sans', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
`
