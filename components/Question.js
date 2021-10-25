import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { correctCountActions } from '../store/correctCount';

const Container = styled.div`
  overflow: auto;
  height: 90vh;

  .question-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .question-title-wrapper {
    display: flex;
    flex-direction: column;
  }

  .question-title-upper-side {
    font-size: 12px;
    align-self: left;
  }

  .question-title-down-side {
    font-weight: bold;
    line-height: 25px;
    word-break: keep-all;
  }

  .question-answer-wrapper {
    padding: 16px;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
  }

  .question-answer {
    font-family: IM_Hyemin-Regular;
    margin-top: 24px;
    background-color: #f0f8ff;
    text-align: left;
    word-break: keep-all;
    border: 1px solid #c6e4ff;
    line-height: 25px;
  }

  .question-answer-correct {
    font-family: IM_Hyemin-Bold;
    background-color: #d3edda;
    border: 1px solid #7cba8a;
    font-weight: bold;
  }

  .question-answer-wrong {
    font-family: IM_Hyemin-Bold;
    background-color: #f8d7db;
    border: 1px solid #c16b73;
    font-weight: bold;
  }
`;

const Question = () => {
  const correctCount = useSelector((state) => state.correctCount.correctCount);
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questions.questions);
  const totalCount = questions.length;

  const selectAnswer = (element, title, answerYn, index) => {
    const titleElement = document.querySelector(
      `#question-title-down-side${index}`
    );

    if (answerYn === true) {
      element.classList.add('question-answer-correct');
      titleElement.classList.add('correct');
    } else {
      element.classList.add('question-answer-wrong');
      titleElement.classList.add('wrong');
    }

    if (titleElement.classList.contains('wrong')) {
      titleElement.innerText = '❌ ' + title;
    } else {
      titleElement.innerText = '🟢 ' + title;
      dispatch(
        correctCountActions.setCorrectCount([correctCount[0] + 1, totalCount])
      );
    }
  };

  return (
    <Container>
      {questions.map((question, index) => (
        <div className="question-wrapper" key={`question-wrapper${index}`}>
          <div className="border">
            <div className="question-title-wrapper p-3 border-bottom">
              <div className="question-title-upper-side">
                ({index + 1} of {totalCount})
              </div>
              <div
                className="question-title-down-side"
                id={`question-title-down-side${index}`}
              >
                <h4>{question.title}</h4>
              </div>
            </div>
            <div className="question-answer-wrapper bg-white border-bottom">
              {question.answers.map((answer, jndex) => (
                <button
                  className="question-answer ml-2"
                  id={`${index}${jndex}`}
                  key={`${index}${jndex}`}
                  onClick={(e) => {
                    selectAnswer(
                      e.target,
                      question.title,
                      answer.answerYn,
                      index
                    );
                  }}
                >
                  {answer.content}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Question;
