import React, {useEffect, useState} from 'react';
import {Subscription, fromEvent, of, timer} from 'rxjs';
import {filter, switchMap, pluck, map, takeWhile, scan, mapTo, startWith, tap} from 'rxjs/operators';

export default () => {
  let subscription: Subscription;

  useEffect(() => {

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="progress-bar">
      <style jsx>{`
        .progress-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .progress-bar-svg {
          width: 100%;
          height: 16px;
        }
      `}</style>
      <h1>progress bar</h1>
      <svg className="progress-bar-svg">
        <path width={'100%'} height={16} fill={'#fb0'}/>
      </svg>
    </div>
  );
};
