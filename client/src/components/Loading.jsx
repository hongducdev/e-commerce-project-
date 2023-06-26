import React, {memo} from 'react';

const Loading = ({isSmall, white}) => {
  return (
    <div
      className={`${isSmall ? 'w-6 h-6' : "w-10 h-10"} mx-auto border-4 border-t-4 rounded-full ${white ? 'border-white' : 'border-primary'} border-t-transparent animate-spin`}></div>
  );
};

export default memo(Loading);
