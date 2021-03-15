import { Answer } from './index';

const AnswersList = ({ answers, select }) => {
  return (
    <div className="c-grid__answer">
      {answers.map((answer, index) => (
        <Answer answer={answer} key={index.toString()} select={select} />
      ))}
    </div>
  );
};

export default AnswersList;
