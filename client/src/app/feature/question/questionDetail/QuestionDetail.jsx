import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadQuestionBySlugAsView, loadQuestionBySlug, likeQuestion, unlikeQuestion, likeAnswer, unlikeAnswer } from '../questionActions';
import { Button, List, Image } from 'semantic-ui-react';
import moment from 'moment/moment.js';
import Loading from '../../../common/ui/loading/Loading';
import AnswerForm from '../answerForm/AnswerForm';
import VoteComponent from '../components/VoteComponent';

const mapState = state => ({
  auth: state.auth,
  question: state.questions.currentQuestion,
  loading: state.async.loading
});

const actions = {
  loadQuestionBySlug,
  loadQuestionBySlugAsView,
  likeQuestion,
  unlikeQuestion,
  likeAnswer,
  unlikeAnswer
};

class QuestionDetail extends Component {
  componentDidMount() {
    const { uid, slug } = this.props.match.params;
    this.props.loadQuestionBySlugAsView(uid, slug);
  }

  handleLikeQuestion = questionId => {
    if (this.props.auth.authenticated) {
      this.props.likeQuestion(questionId);
    }
  };

  handleUnlikeQuestion = questionId => {
    if (this.props.auth.authenticated) {
      this.props.unlikeQuestion(questionId);
    }
  };

  handleLikeAnswer = answerId => {
    if (this.props.auth.authenticated) {
      this.props.likeAnswer(this.props.question._id, answerId);
    }
  };

  handleUnlikeAnswer = answerId => {
    if (this.props.auth.authenticated) {
      this.props.unlikeAnswer(this.props.question._id, answerId);
    }
  };

  render() {
    const { history, loading, question, loadQuestionBySlug } = this.props;
    if (loading) return <Loading />;
    return (
      <>
        {!loading && question && (
          <div className='question-detail'>
            <div className='flex-box md'>
              <div className='grow info'>
                <h1 className='mb-1'>{question.title}</h1>
                <p>
                  <span>Asked</span>&nbsp;<strong>{moment(question.updated).from()}</strong>
                </p>
                <hr />
                <div className='flex-box'>
                  <VoteComponent item={question} like={this.handleLikeQuestion} unlike={this.handleUnlikeQuestion} />
                  <div className='grow mb-2' dangerouslySetInnerHTML={{ __html: question.content }} />
                </div>
                <hr />
                <h5 className='my-1'>
                  {question.answers ? question.answers.length : 0} Answer{question.answers.length === 1 ? '' : 's'}
                </h5>
                <hr />
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, idx) => (
                    <div key={idx.toString()}>
                      <div className='flex-box'>
                        <VoteComponent item={answer} like={this.handleLikeAnswer} unlike={this.handleUnlikeAnswer} />
                        <div className='grow'>
                          <div className='mb-2' dangerouslySetInnerHTML={{ __html: answer.content }} />
                          <div className='user mb-2'>
                            <div>
                              <List horizontal>
                                <List.Item>
                                  <Image avatar src={answer.user.avatar} />
                                  <List.Content verticalAlign='middle'>{answer.user.screenName}</List.Content>
                                </List.Item>
                              </List>
                            </div>
                            {answer.updated && <div className='asked'>Answered {moment(answer.updated).from()}</div>}
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                <AnswerForm question={question} reload={loadQuestionBySlug} />
              </div>
              <div className='ask-button'>
                <Button color='green' onClick={() => history.push('/ask')}>
                  Ask Question
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(connect(mapState, actions)(QuestionDetail));
