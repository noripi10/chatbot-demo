import React, { useEffect, useState, useCallback } from 'react';
import './assets/styles/style.css';
// import defaultDataset from './dataset.json';

import { db } from './firebase/index';

import { AnswersList, Chats } from './components';
import FormDialog from './components/Forms/FromDialog';
import { Loading } from './components/Loading';

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState('init');
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question',
    });

    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  };

  const addChats = (chat) => {
    setChats((prevChats) => [...prevChats, chat]);
  };

  const selectAnswer = async (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === 'contact':
        handleClickOpen();
        break;

      case /^https:*/.test(nextQuestionId):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;

      default:
        addChats({
          text: selectedAnswer,
          type: 'answer',
        });

        // 回答を遅延させる
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve('ok');
          }, 1200);
        });

        displayNextQuestion(nextQuestionId, dataset[nextQuestionId]);
        break;
    }
  };

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    (async () => {
      const initDataset = {};

      // const snapShots = await db.collection('questions').get();
      // snapShots.forEach((doc) => {
      //   initDataset[doc.id] = doc.data();
      // });
      // setDataset(initDataset);

      await db
        .collection('questions')
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            initDataset[doc.id] = doc.data();
          });
        });

      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const target = document.getElementById('scroll-area');
    if (target) {
      // scrollTopをスクロール領域の最大高さへ調整する
      target.scrollTop = target.scrollHeight;
    }
  });

  return (
    <section className="c-section">
      <div className="c-box">
        {Object.keys(dataset).length ? (
          <>
            <Chats chats={chats} />
            <AnswersList answers={answers} select={selectAnswer} />
            <FormDialog open={open} handleClose={handleClose} />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

export default App;
