import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import palette from '../styles/palette';

const Container = styled.footer`
  width: 100%;
  height: 5vh;
  position: sticky;
  border: 1px solid ${palette.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  .footer-button {
    font-size: 32px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 0;
    line-height: 0;
    outline: none;
    text-decoration: none;
    color: black;
  }
`;
const Footer = () => {
  const router = useRouter();

  const goHome = () => {
    router.reload('/');
  };
  return (
    <Container>
      <a
        className="footer-button"
        onClick={() => {
          goHome();
        }}
      >
        Reset
      </a>
    </Container>
  );
};

export default Footer;
