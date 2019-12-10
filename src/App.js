import React, { useCallback, useEffect, useRef, useState } from 'react';

import { getInference } from './model';
import { IMAGE_SIZE, MIN_SHAPE_SIZE, MAX_SHAPE_SIZE, COLORS } from './constants';

import './App.css';

const CANVAS_SIZE = 256;
const CANVAS_RATIO = CANVAS_SIZE / IMAGE_SIZE;
const MIN_CANVAS_SHAPE_SIZE = MIN_SHAPE_SIZE * CANVAS_RATIO;
const MAX_CANVAS_SHAPE_SIZE = MAX_SHAPE_SIZE * CANVAS_RATIO;

function App() {
  const [question, setQuestion] = useState('');

  const mainCanvas = useRef(null);
  const smallCanvas = useRef(null);

  const onSubmit = useCallback(e => {
    e.preventDefault();

    // Draw the main canvas to our smaller, correctly-sized canvas
    const ctx = smallCanvas.current.getContext('2d');
    const ratio = IMAGE_SIZE / CANVAS_SIZE;
    ctx.scale(ratio, ratio);
    ctx.drawImage(mainCanvas.current, 0, 0);

    getInference(smallCanvas.current, question);
  }, [question]);

  const onQuestionChange = useCallback(e => {
    setQuestion(e.target.value);
  }, [setQuestion]);

  const randomizeImage = useCallback(() => {
    const context = mainCanvas.current.getContext('2d');

    // Background color
    // The range (230, 255) matches the corresponding range in easy-VQA
    const r = Math.floor(230 + Math.random() * 26);
    const g = Math.floor(230 + Math.random() * 26);
    const b = Math.floor(230 + Math.random() * 26);
    context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Shape
    context.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
    const w = Math.random() * (MAX_CANVAS_SHAPE_SIZE - MIN_CANVAS_SHAPE_SIZE) + MIN_CANVAS_SHAPE_SIZE;
    const h = Math.random() * (MAX_CANVAS_SHAPE_SIZE - MIN_CANVAS_SHAPE_SIZE) + MIN_CANVAS_SHAPE_SIZE;
    context.fillRect(
      Math.random() * (CANVAS_SIZE - w),
      Math.random() * (CANVAS_SIZE - h),
      w,
      h,
    );
  }, [mainCanvas]);

  useEffect(randomizeImage, []);

  return (
    <div className="App">
      <canvas ref={mainCanvas} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      <canvas ref={smallCanvas} width={IMAGE_SIZE} height={IMAGE_SIZE} style={{ display: 'none' }} />
      <button onClick={randomizeImage}>Randomize Image</button>
      <form onSubmit={onSubmit}>
        <label>Enter a question:</label>
        <input
          type="text"
          placeholder="What color is the shape?"
          value={question}
          onChange={onQuestionChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
