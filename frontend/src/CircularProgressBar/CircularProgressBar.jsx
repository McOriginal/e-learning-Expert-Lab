import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import classes from './CircularProgressBar.module.css';

const CircularProgressBar = ({ isSuccess, message, duration = 5000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, duration / 100);

    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  return (
    <div className={classes.overlay}>
      <div className={classes.circular_progress_container}>
        <div className={classes.circular_progress} style={{ '--progress': `${progress}%` }}>
          <div className={classes.inner_circle}>
            {isSuccess ? (
              <FaCheckCircle className={`${classes.icon} ${classes.success}`} />
            ) : (
              <FaTimesCircle className={`${classes.icon} ${classes.error}`} />
            )}
          </div>
        </div>
        <p className={`${classes.message} ${isSuccess ? classes.success : classes.error}`}>{message}</p>
      </div>
    </div>
  );
};

export default CircularProgressBar;
