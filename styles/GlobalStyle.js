import { createGlobalStyle } from 'styled-components';
import FontCss from './Font';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${FontCss}
    ${reset}
    * {
        box-sizing: border-box;
    }

    body {
        font-family: IM_Hyemin-Bold;
        height: 100%;
        min-height: 100%;
        overflow: hidden !important;
        touch-action: none;
    }
`;

export default GlobalStyle;
