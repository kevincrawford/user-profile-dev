import React from 'react';
import moment from 'moment/moment.js';
import { List, Image } from 'semantic-ui-react';

const PosterInfo = info => {
  return (
    <>
      {info && (
        <div className='user'>
          <div>
            <List horizontal>
              <List.Item>
                <Image avatar src={info.user.avatar} />
                <List.Content verticalAlign='middle'>{info.user.screenName}</List.Content>
              </List.Item>
            </List>
          </div>
          <div className='asked'>asked {moment(info.created).from()}</div>
        </div>
      )}
    </>
  );
};

export default PosterInfo;
