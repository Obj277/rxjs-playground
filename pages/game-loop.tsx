import React, {useEffect, useRef, useState} from 'react';
import {of, animationFrameScheduler} from 'rxjs';
import {filter, switchMap, pluck, map, takeWhile, scan, mapTo, startWith, tap, repeat} from 'rxjs/operators';
import shuffle from 'lodash/shuffle';

const getPositiveOrNegative = () => shuffle([-2, 0, 2])[0];

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const velocity = {
    x: getPositiveOrNegative(),
    y: getPositiveOrNegative(),
  };
  const world = {
    width: 500,
    height: 500,
  };

  const ball = {
    width: 10,
    height: 10,
    x: Math.floor(world.width / 2),
    y: Math.floor(world.height / 2),
  };

  const drawWorld = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, world.width, world.height);
  };

  const drawBall = (ctx: CanvasRenderingContext2D) => {
    ball.x += velocity.x;
    ball.y += velocity.y;
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
  };

  useEffect(() => {
    const loop = of(animationFrameScheduler).pipe(
      startWith(canvasRef.current.getContext('2d')),
      tap((ctx: CanvasRenderingContext2D) => {
        drawWorld(ctx);
        drawBall(ctx);
      }),
      repeat(),
    ).subscribe();

    return () => {
      loop.unsubscribe();
    };
  }, []);

  return (
    <div className="game-view">
      <style jsx>{`
        .game-view {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .canvas {
          border: 1px solid #ddd;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        className="canvas"
        width={world.width}
        height={world.height}
      />
    </div>
  );
};
