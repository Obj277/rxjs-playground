import React, {useEffect, useRef} from 'react';
import {of, animationFrameScheduler} from 'rxjs';
import {startWith, tap, repeat} from 'rxjs/operators';

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const velocity = {
    x: 4,
    y: 2,
  };
  const world = {
    width: 500,
    height: 500,
  };

  const ball = {
    width: 10,
    height: 10,
    x: 20,
    y: 40,
  };

  const collision = () => {
    if (ball.x >= world.width - ball.width || ball.x === 0) {
      velocity.x *= -1;
    }
    if (ball.y >= world.height - ball.height || ball.y === 0) {
      velocity.y *= -1;
    }
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
    const ctx = canvasRef.current.getContext('2d');
    const loop$ = of(animationFrameScheduler).pipe(
      startWith(ctx),
      tap((ctx: CanvasRenderingContext2D) => {
        collision();
        drawWorld(ctx);
        drawBall(ctx);
      }),
      repeat(),
    ).subscribe();

    return () => {
      loop$.unsubscribe();
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
