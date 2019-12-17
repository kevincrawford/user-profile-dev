import React from 'react';
import { Icon } from 'semantic-ui-react';

const VoteComponent = ({ item, like, unlike }) => {
  const type = item.slug ? 'Question' : 'Answer';
  return (
    <div className='vote-component'>
      <Icon link size='big' title={`This ${type} is Clear and Usefull`} name='caret up' onClick={() => like(item._id)} />
      <div>{!item.rating ? '0' : item.rating}</div>
      <Icon link size='big' title={`This ${type} is Unclear or Not Useful`} name='caret down' onClick={() => unlike(item._id)} />
    </div>
  );
};

export default VoteComponent;
