import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionListItem from './QuestionListItem';

const mapState = state => ({
  loading: state.async.loading,
  questions: state.questions.questions
});

class QuestionList extends Component {
  render() {
    const { loading, questions } = this.props;
    return <>{!loading && questions && questions.map(question => <QuestionListItem key={question._id} question={question} />)}</>;
  }
}

export default connect(mapState)(QuestionList);
