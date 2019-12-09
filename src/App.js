import React, { useCallback, useRef, useState } from 'react';

import { getInference } from './model';
import { IMAGE_SIZE } from './constants';

import './App.css';

const CANVAS_SIZE = 256;

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

  return (
    <div className="App">
      <canvas ref={mainCanvas} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      <canvas ref={smallCanvas} width={IMAGE_SIZE} height={IMAGE_SIZE} style={{ display: 'none' }} />
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
