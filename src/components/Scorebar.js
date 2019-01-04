// @flow strict
import React from 'react';
import '../styles/Scorebar.scss';

type Props = {
  score: number
};

const Scorebar = (props: Props) => {
  const { score } = props;

  return (
    <div className="scorebar">
      <span className="scorebar-score-area" style={{ width: `${score}%` }} />
      <span className="scorebar-text">{score}</span>
    </div>
  );
};

export default Scorebar;
