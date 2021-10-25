import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import ShuffleIcon from '../public/static/svg/shuffle.svg';

const Container = styled.div`
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 0 12px;
  border-bottom: 3px solid yellowgreen;

  .title {
    font-size: 24px;
  }

  .sub-title {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }

  .sub-title-score {
    display: flex;
    margin-top: 12px;
    font-size: 24px;
  }

  .sub-title-shuffle-icon {
    display: flex;
    margin-left: 12px;
  }
`;

const Header = () => {
  const correctCount = useSelector((state) => state.correctCount.correctCount);

  return (
    <Container>
      <h1 className="title">👀 Question Solver 👀</h1>
      <div
        className="sub-title"
        onClick={() => {
          Router.push('/?refresh=Y');
        }}
      >
        <h2 className="sub-title-score">
          {`${correctCount[0]} / ${correctCount[1]}`}
        </h2>
        <ShuffleIcon className="sub-title-shuffle-icon" />
      </div>
    </Container>
  );
};

export default Header;
