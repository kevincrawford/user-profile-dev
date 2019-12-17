import React from 'react';

const UserDashboard = () => {
  return (
    <div className='flex-box md'>
      <div className='grow'>
        <div>about me</div>
        <div>progress</div>
        <div>social</div>
      </div>
      <div className='spacer'></div>
      <div className='grow'>
        <div>summary</div>
        <div>experience</div>
        <div>education</div>
        <div>certifications</div>
      </div>
      <div className='spacer'></div>
      <div className='grow'>
        <div>visible</div>
        <div>relocate</div>
        <div>resumes</div>
        <div>other</div>
      </div>
    </div>
  );
};

export default UserDashboard;
