import React, { useCallback, useRef, useState } from 'react';

import { getInference } from './model';

import './App.css';

function App() {
  const [question, setQuestion] = useState('');

  const mainCanvas = useRef(null);
  const smallCanvas = useRef(null);

  const onSubmit = useCallback(e => {
    e.preventDefault();

    let canvas = document.getElementById('main-canvas');
    scaleImageData();
    getInference(smallCanvas.current, question);
  }, [question]);

  const onQuestionChange = useCallback(e => {
    setQuestion(e.target.value);
  }, [setQuestion]);

  function scaleImageData() {
    const ctx = smallCanvas.current.getContext('2d');
    ctx.scale(0.5, 0.5);
    ctx.drawImage(mainCanvas.current, 0, 0);
  }

  return (
    <div className="App">
      <canvas ref={mainCanvas} width="128" height="128" />
      <canvas ref={smallCanvas} width="64" height="64" style={{ display: 'none' }} />
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
