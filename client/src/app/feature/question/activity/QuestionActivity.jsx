import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const QuestionActivity = () => {
  return (
    <>
      <Header attached='top' content='Recent Activity' />
      <Segment attached>
        <p>Recent activity</p>
      </Segment>
    </>
  );
};

export default QuestionActivity;
