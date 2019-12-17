import React from 'react';

const QuestionHints = () => {
  return (
    <div className='question-hints'>
      <h5>Draft Your Question</h5>
      <p>The community is here to help you with SPED-related issues.</p>
      <p>
        Ask questions that can be <em>answered,</em> not just discussed. Opinions should be backed up either <strong>with a reference</strong>, or experiences that{' '}
        <strong>happened to you personally</strong>.
      </p>
      <section>
        <h6>Summarize Your Question</h6>
        <ul>
          <li>Describe your goal</li>
          <li>Describe expected and actual results</li>
        </ul>
      </section>
      <section>
        <h6>Include What You've Tried</h6>
        <ul>
          <li>Show what you’ve tried and tell us why it didn’t meet your needs. You will get better answers when you provide research.</li>
        </ul>
      </section>
    </div>
  );
};

export default QuestionHints;
