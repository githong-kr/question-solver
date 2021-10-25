import React from 'react';
import Router, { useRouter } from 'next/router';
import { wrapper } from '../store';
import { questionsActions } from '../store/questions';
import { correctCountActions } from '../store/correctCount';
import Question from '../components/Question';

import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';

const App = () => {
  return <Question />;
};

let questions = [];
let newQuestions = [];
let flag = false;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      if ('Y' === query.refresh) {
        flag = false;
        return {
          redirect: {
            destination: '/',
          },
          props: {},
        };
      }
      if (!flag) {
        flag = true;
        // Load client secrets from a local file.
        fs.readFile('credentials.json', async (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Sheets API.
          authorize(JSON.parse(content), listMajors);
        });

        async function init() {
          await sleep(100);
        }

        function sleep(ms) {
          return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        }

        while (questions.length === 0) await init();
      } else {
        questions = [...newQuestions];
      }

      function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }

      let tempQuestions = [];
      questions.forEach((question) => {
        let newQuestion = {};
        let title = question.title;
        let answers = [...question.answers];
        shuffle(answers);
        newQuestion.title = title;
        newQuestion.answers = answers;
        tempQuestions.push(newQuestion);
      });
      shuffle(tempQuestions);

      store.dispatch(questionsActions.setQuestions(tempQuestions));
      store.dispatch(
        correctCountActions.setCorrectCount([0, questions.length])
      );

      newQuestions = questions;
      questions = [];
      return { props: {} };
    }
);

const authorize = (credentials, callback) => {
  const TOKEN_PATH = 'token.json';

  const client_secret = credentials.client_secret;
  const client_id = credentials.client_id;
  const redirect_uris = credentials.redirect_uris;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
};

const getNewToken = (oAuth2Client, callback) => {
  const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          'Error while trying to retrieve access token',
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
};

const listMajors = (auth) => {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: `${process.env.SPREAD_SHEET_KEY}`,
      range: '금융마케팅기초!A:F',
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;

      if (rows.length) {
        rows.map((row) => {
          let question = {};
          let answers = [];
          let rowLength = row.length;

          row.forEach((titleAndAnswers, index) => {
            if (index === 0) {
              question.title = titleAndAnswers;
            } else if (index < rowLength - 1) {
              let answer = {};
              answer.content = titleAndAnswers;
              answer.answerYn = false;
              answers.push(answer);
            }

            if (index === rowLength - 1) {
              let answerNumber = parseInt(titleAndAnswers);
              answers[answerNumber - 1].answerYn = true;
            }
          });

          question.answers = answers;
          questions.push(question);
        });
      } else {
        console.log('No data found.');
      }
    }
  );
};

export default App;
