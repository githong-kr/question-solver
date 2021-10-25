import GlobalStyle from '../styles/GlobalStyle';
import React from 'react';
import { wrapper } from '../store';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import 'bootstrap/dist/css/bootstrap.css';

const app = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </>
  );
};

export default wrapper.withRedux(app);
