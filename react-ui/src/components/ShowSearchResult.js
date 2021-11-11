import React from 'react';

const ShowSearchResult = ({ show, chooseShow }) => {
  const handlePlay = () => {
    console.log(`${show.name} chosen`);
    chooseShow(show);
  };

  return (
    <div
      className='d-flex m-2 align-items-center'
      style={{ cursor: 'pointer' }}
      onClick={handlePlay}
    >
      <img src={show.imageSmall} style={{ style: '64px', width: '64px' }} />
      <div className='ms-2'>
        <div>{show.name}</div>
        <div className='text-muted'>{show.total_episodes}</div>
      </div>
    </div>
  );
};

export default ShowSearchResult;
