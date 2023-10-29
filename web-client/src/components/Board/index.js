import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { shape } from '../../constants';
import './index.css';

export default function PaintBoard({
  imageRef,
  paintOpacity,
  paintRef,
  paintShape,
  showMask,
}) {
  const [enter, setEnter] = useState(false);
  const [isPainting, setIsPainting] = useState(false);

  const getCursorPosition =useCallback((evt) => {
    const canvasPos = paintRef.current.getBoundingClientRect();
    return {
        x: evt.clientX - canvasPos.left,
        y: evt.clientY - canvasPos.top,
    };
  }, [paintRef]);

  const onMouseEvent = useCallback(() => {
    setEnter(!enter);
  }, [enter]);

  const onPaintStart = useCallback((evt) => {
    if (isPainting || !showMask) return;
    setIsPainting(true);

    const pos = getCursorPosition(evt);
    const ctx = paintRef.current.getContext('2d');

    ctx.strokeStyle = 'rgba(253, 150, 38, 0.41)';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [getCursorPosition, isPainting, paintRef, showMask]);

  const onPainting = useCallback((evt) => {
    if (!isPainting || !showMask) return;

    const pos = getCursorPosition(evt);
    const ctx = paintRef.current.getContext('2d');

    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = 'rgba(253, 150, 38, 0.41)';

    ctx.stroke();
  }, [getCursorPosition, isPainting, paintRef, showMask]);

  const onPaintEnd = useCallback((evt) => {
    if (!isPainting || !showMask) return;
    setIsPainting(false);

    const pos = getCursorPosition(evt);
    const ctx = paintRef.current.getContext('2d');

    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = 'rgba(253, 150, 38, 0.41)';
    ctx.stroke();
  }, [getCursorPosition, isPainting, paintRef, showMask]);

  return (
    <div className="board">
      <canvas
        className="image"
        onMouseEnter={onMouseEvent}
        onMouseLeave={onMouseEvent}
        onMouseDown={onPaintStart}
        onMouseMove={onPainting}
        onMouseUp={onPaintEnd}
        ref={imageRef}
        width={shape.width}
        height={shape.height}
      />
      <canvas
        className={clsx('paint', enter && 'draw-cursor')}
        onMouseEnter={onMouseEvent}
        onMouseLeave={onMouseEvent}
        onMouseDown={onPaintStart}
        onMouseMove={onPainting}
        onMouseUp={onPaintEnd}
        ref={paintRef}
        width={paintShape.width}
        height={paintShape.height}
        style={{ opacity: paintOpacity }}
      />
    </div>
  );
}

PaintBoard.propTypes = {
  imageRef: PropTypes.object.isRequired,
  paintOpacity: PropTypes.number,
  paintRef: PropTypes.object.isRequired,
  paintShape: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  showMask: PropTypes.bool,
};
