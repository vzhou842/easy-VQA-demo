import React, { useCallback, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

import {WORD_INDEX, ANSWERS} from './constants';

import './App.css';

function App() {
  const [question, setQuestion] = useState('');

  function getBagOfWords(str) {
    str = str.replace(/[^\w\s]|_/g, '')
             .replace(/\s+/g, ' ')
             .replace(/[0-9]/g, '')
             .toLowerCase();
    
    let tokens = str.split(' ');
    let bagOfWords = Array(Object.keys(WORD_INDEX).length).fill(0);
    tokens.forEach(token => {
      if (token in WORD_INDEX) {
        bagOfWords[WORD_INDEX[token]] += 1;
      }
    })
    return bagOfWords;
  }

  function scaleImageData(bigCanvas) {
    let canvas = document.getElementById('small-canvas');
    const ctx = canvas.getContext('2d');
    ctx.scale(0.5, 0.5);
    ctx.drawImage(bigCanvas, 0, 0);        
    return canvas;
  }

  function getInference(imageData, questionBOW) {
    console.log('called getInference');
    tf.loadLayersModel('https://atlantic-question.glitch.me/assets/model.json').then(model => {
      console.log('Successfully loaded weights');
      let imageTensor = tf.browser.fromPixels(imageData, 3);
      imageTensor = imageTensor.expandDims(0);
      imageTensor.print();
      let questionTensor = tf.tensor(questionBOW);
      questionTensor = questionTensor.expandDims(0);
      let output = model.predict([imageTensor, questionTensor]);
      let finalIdx = output.argMax(1).arraySync();

      console.log('Answer:', ANSWERS[finalIdx[0]]);
    })
    .catch(err => console.log(err));
  }
  
  const onSubmit = useCallback(e => {
    e.preventDefault();

    let canvas = document.getElementById('main-canvas');
    let smallCanvas = scaleImageData(canvas);
    let questionBOW = getBagOfWords(`${question}`);
    console.log('bow: ', questionBOW);
    getInference(smallCanvas, questionBOW);
  }, [question]);

  const onQuestionChange = useCallback(e => {
    setQuestion(e.target.value);
  }, [setQuestion]);

  return (
    <div className="App">
      <canvas id="main-canvas" width="128" height="128"></canvas>
      <canvas id="small-canvas" width="64" height="64"></canvas>
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
