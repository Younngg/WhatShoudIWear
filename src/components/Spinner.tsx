import React from 'react';

const Spinner = () => {
  return (
    <div className='spinner-border d-block mx-auto text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  );
};

export default Spinner;
