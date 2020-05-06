import React, {useEffect, useRef, useState} from 'react';
import {fromEvent, of, timer} from 'rxjs';
import {filter, switchMap, pluck, map, takeWhile, scan, mapTo, startWith, tap} from 'rxjs/operators';

export default () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const numRef = useRef<number>(0);
  const [number, setNumber] = useState(0);

  const increaseOrDecrease = (fromNum: number, toNum: number) => {
    return fromNum < toNum ? 1 : -1;
  };

  const takeUntil = (fromNum: number, toNum: number) => {
    return fromNum < toNum ?
      (v: number) => v <= toNum :
      (v: number) => v >= toNum;
  };

  const enter$ = of(inputEl).pipe(
    filter(el => !!(el && el.current)),
    switchMap(el => fromEvent(el.current, 'keydown').pipe(
      // pluck 으로 안뽑아내면 code 추론이 안됨 ㅠ
      pluck('code'),
      filter(code => code === 'Enter'),
      map(() => inputEl.current.valueAsNumber),
      switchMap(toNum => timer(0, 10).pipe(
        mapTo(increaseOrDecrease(numRef.current, toNum)),
        startWith(numRef.current),
        scan((acc, cur) => acc + cur),
        takeWhile(takeUntil(numRef.current, toNum)),
        tap(v => numRef.current = v)
      )),
    ))
  );

  useEffect(() => {
    const subscription = enter$.subscribe(v => setNumber(v));

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="smart-counter">
      <style jsx>{`
        .smart-counter {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .number-input {
          padding: 4px;
          font-size: 18px;
        }
      `}</style>
      <h1>{number}</h1>
      <input ref={inputEl} type="number" className="number-input"/>
    </div>
  );
};