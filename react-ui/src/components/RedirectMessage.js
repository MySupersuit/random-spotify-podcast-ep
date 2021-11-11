import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectMessage = ({ secondsToWait, dest }) => {
  const [seconds, setSeconds] = useState(secondsToWait);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      navigate(dest);
    }
  }, [seconds]);

  return (
    <div>
      Logged in to Spotify.
      <br /> Redirecting in {seconds} {seconds === 1 ? 'second' : 'seconds'}
      ...
    </div>
  );
};

export default RedirectMessage;
