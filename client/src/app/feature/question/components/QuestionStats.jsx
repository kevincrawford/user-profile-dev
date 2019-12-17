import React from 'react';

const QuestionStats = props => {
  const { likeCount, answers, viewCount } = props.question;
  const answerCount = answers ? answers.length : 0;
  return (
    <>
      {props.question && (
        <div className='question-statistics'>
          <div className='stacked'>
            <div className='value'>{likeCount}</div>
            <div className='label'>votes</div>
          </div>
          <div className='stacked'>
            <div className='value'>{answerCount}</div>
            <div className='label'>answers</div>
          </div>
          <div className='stacked'>
            <div className='value'>{viewCount}</div>
            <div className='label'>views</div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionStats;
