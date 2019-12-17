import React, { Component } from 'react';
import { Segment, List, Image } from 'semantic-ui-react';
import { parse } from 'node-html-parser';
import { truncateText } from '../../../common/util/truncateText';
import QuestionListTag from '../list/QuestionListTag';
import moment from 'moment/moment.js';
import QuestionStats from '../components/QuestionStats';

const dummyQuestion = {
  likeCount: 0,
  viewCount: 0,
  answers: null
};

const parseContent = content => {
  const parsed = parse(content);
  return parsed.structuredText;
};

class QuestionPreview extends Component {
  render() {
    const { question, user } = this.props;
    const now = new Date();
    return (
      <Segment vertical>
        <div className='flex-box'>
          <QuestionStats question={dummyQuestion} />
          <div className='grow info'>
            <h3>
              <span className='link'>{question.title}</span>
            </h3>
            <div className='mb-3'>{truncateText(parseContent(question.content))}</div>
            <div className='info'>
              <div className='flex-box'>
                <div className='user'>
                  <div>
                    <List horizontal>
                      <List.Item>
                        <Image avatar src={user.avatar} />
                        <List.Content verticalAlign='middle'>{user.screenName}</List.Content>
                      </List.Item>
                    </List>
                  </div>
                  <div className='asked'>asked {moment(now).from()}</div>
                </div>
                <div className='grow'>
                  <List horizontal>{question.tags && question.tags.split(',').map((tag, i) => <QuestionListTag key={i.toString()} tag={{ text: tag, _id: i }} />)}</List>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Segment>
    );
  }
}

export default QuestionPreview;
