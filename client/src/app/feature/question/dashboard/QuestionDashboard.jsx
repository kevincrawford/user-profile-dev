import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Pagination } from 'semantic-ui-react';
import { createQuestion, updateQuestion, loadQuestionsByPage } from '../questionActions';
import Loading from '../../../common/ui/loading/Loading';
import QuestionList from '../list/QuestionList';

const mapState = state => ({
  loading: state.async.loading,
  questions: state.questions.questions,
  questionCount: state.questions.questionCount,
  activePage: state.questions.activePage,
  totalPages: state.questions.totalPages,
  boundaryRange: 1,
  siblingRange: 1
});

const actions = {
  createQuestion,
  updateQuestion,
  loadQuestionsByPage
};

class QuestionDashboard extends Component {
  componentDidMount() {
    this.props.loadQuestionsByPage(this.props.page || 1);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.props.loadQuestionsByPage(activePage);
  };

  render() {
    const { loading, history, questions, questionCount, activePage, boundaryRange, siblingRange, totalPages } = this.props;
    if (loading) return <Loading />;
    return (
      <>
        <div className='question-head'>
          <div className='flex-box top'>
            <h1>Questions</h1>
            <Button color='green' onClick={() => history.push('/ask')}>
              Ask Question
            </Button>
          </div>
          <div className='flex-box bottom'>
            <div>{questionCount} questions</div>
            <div>
              <Button.Group basic size='mini'>
                <Button>Newest</Button>
                <Button>Active</Button>
                <Button>Votes</Button>
              </Button.Group>
            </div>
          </div>
        </div>
        {questions && (
          <div className='questions-dashboard flex-box md'>
            <div className='grow'>
              <QuestionList />
            </div>
          </div>
        )}
        {!loading && totalPages > 1 && (
          <Pagination
            className='questions'
            size='mini'
            onPageChange={this.handlePaginationChange}
            activePage={activePage || 1}
            boundaryRange={boundaryRange}
            siblingRange={siblingRange}
            totalPages={totalPages}
            ellipsisItem={totalPages > 5 ? undefined : null}
            firstItem={null}
            lastItem={null}
            prevItem={totalPages > 5 ? undefined : null}
            nextItem={totalPages > 5 ? undefined : null}
          />
        )}
      </>
    );
  }
}

export default connect(mapState, actions)(QuestionDashboard);
