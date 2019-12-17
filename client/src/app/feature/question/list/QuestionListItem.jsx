import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Segment, List, Image } from 'semantic-ui-react';
import { truncateText } from '../../../common/util/truncateText';
import moment from 'moment/moment.js';
import QuestionListTag from './QuestionListTag';
import QuestionStats from '../components/QuestionStats';

class QuestionListItem extends Component {
  handleClickQuestion = path => {
    this.props.history.push(path);
  };
  render() {
    const { question } = this.props;
    return (
      <Segment vertical>
        <div className='flex-box'>
          <QuestionStats question={question} />
          <div className='grow info'>
            <h3>
              <span className='link' onClick={() => this.handleClickQuestion(`/questions/${question.uid}/${question.slug}`)}>
                {question.title}
              </span>
            </h3>
            <div className='mb-3'>{truncateText(question.rawText)}</div>
            <div className='info'>
              <div className='flex-box'>
                <div className='user'>
                  <div>
                    <List horizontal>
                      <List.Item>
                        <Image avatar src={question.user.avatar} />
                        <List.Content verticalAlign='middle'>{question.user.screenName}</List.Content>
                      </List.Item>
                    </List>
                  </div>
                  {question.updated && <div className='asked'>asked {moment(question.updated).from()}</div>}
                </div>
                <div className='grow'>
                  <List horizontal>{question.tags && Object.values(question.tags).map((tag, idx) => <QuestionListTag key={idx.toString()} tag={tag} />)}</List>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Segment>
    );
  }
}

export default withRouter(connect()(QuestionListItem));
