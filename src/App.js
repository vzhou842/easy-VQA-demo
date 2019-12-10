import React, { useCallback, useEffect, useRef, useState } from 'react';

import { getInference } from './model';
import { IMAGE_SIZE, MIN_SHAPE_SIZE, MAX_SHAPE_SIZE, COLORS } from './constants';
import { randint } from './utils';

import './App.css';

const CANVAS_SIZE = 256;
const CANVAS_RATIO = CANVAS_SIZE / IMAGE_SIZE;
const MIN_CANVAS_SHAPE_SIZE = MIN_SHAPE_SIZE * CANVAS_RATIO;
const MAX_CANVAS_SHAPE_SIZE = MAX_SHAPE_SIZE * CANVAS_RATIO;

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);

  const mainCanvas = useRef(null);
  const smallCanvas = useRef(null);

  const onSubmit = useCallback(async e => {
    e.preventDefault();

    // Draw the main canvas to our smaller, correctly-sized canvas
    const ctx = smallCanvas.current.getContext('2d');
    const ratio = IMAGE_SIZE / CANVAS_SIZE;
    ctx.scale(ratio, ratio);
    ctx.drawImage(mainCanvas.current, 0, 0);

    const answer = await getInference(smallCanvas.current, question);
    setAnswer(answer);
  }, [question, setAnswer]);

  const onQuestionChange = useCallback(e => {
    setQuestion(e.target.value);
  }, [setQuestion]);

  const randomizeImage = useCallback(() => {
    const context = mainCanvas.current.getContext('2d');

    // Background color
    // The range (230, 255) matches the corresponding range in easy-VQA
    const r = randint(230, 255);
    const g = randint(230, 255);
    const b = randint(230, 255);
    context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Shape
    context.fillStyle = COLORS[randint(0, COLORS.length - 1)];
    const w = randint(MIN_CANVAS_SHAPE_SIZE, MAX_CANVAS_SHAPE_SIZE);
    const h = randint(MIN_CANVAS_SHAPE_SIZE, MAX_CANVAS_SHAPE_SIZE);
    context.fillRect(
      randint(0, CANVAS_SIZE - w),
      randint(0, CANVAS_SIZE - h),
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
      {!!answer && (
        <p>Prediction: <b>{answer}</b></p>
      )}
    </div>
  );
}

export default App;
