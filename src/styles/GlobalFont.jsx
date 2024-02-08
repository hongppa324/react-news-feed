import { createGlobalStyle } from "styled-components";
import NanumSquareRoundEB from "../assets/fonts/NanumSquareRoundEB.woff"

const GlobalFont = createGlobalStyle`    
     @font-face {
        font-family: "nanum";
        src: local("nanum"), url(${NanumSquareRoundEB}) format('woff'); 
        font-weight: normal;
    }
`;

export default GlobalFont;
