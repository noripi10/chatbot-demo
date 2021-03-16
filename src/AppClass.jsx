import React from 'react';
import './assets/styles/style.css';
// import defaultDataset from './dataset.json';

import { db } from './firebase/index';

import { AnswersList, Chats } from './components';
import FormDialog from './components/Forms/FromDialog';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: {},
      open: false,
    };

    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question',
    });

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats,
      currentId: nextQuestionId,
    });
  };

  selectAnswer = async (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === 'init':
        this.displayNextQuestion(nextQuestionId);
        break;

      case nextQuestionId === 'contact':
        this.handleClickOpen();
        break;
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: 'answer',
        });
        this.setState({
          chats,
        });

        // 回答を遅延させる
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve('ok');
          }, 1200);
        });

        this.displayNextQuestion(nextQuestionId);
        break;
    }
  };

  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const initAnswers = initDataset.answers;

    this.setState({
      answers: initAnswers,
    });
  };

  initChats = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const chat = {
      text: initDataset.question,
      type: 'question',
    };

    this.setState({
      chats: [chat],
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  initDataSet = (dataset) => {
    this.setState({ dataset });
  };

  componentDidMount() {
    const dataset = {};
    (async () => {
      const snapshots = await db.collection('questions').get();
      snapshots.forEach((doc) => {
        dataset[doc.id] = doc.data();
      });
      this.initDataSet(dataset);
      const initAnswer = '';
      this.selectAnswer(initAnswer, this.state.currentId);
    })();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const target = document.getElementById('scroll-area');
    if (target) {
      // scrollTopをスクロール領域の最大高さへ調整する
      target.scrollTop = target.scrollHeight;
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer}
          />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    );
  }
}
