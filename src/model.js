import * as tf from '@tensorflow/tfjs';

import {WORD_INDEX, ANSWERS} from './constants';

const loadModelPromise = tf.loadLayersModel('https://pkwang.glitch.me/assets/model.json')
  .then(model => {
    console.log('Successfully loaded weights');
    return model;
  });

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

export function getInference(imageData, question) {
  const questionBOW = getBagOfWords(question);
  loadModelPromise.then(model => {
    console.log('Performing inference...');
    let imageTensor = tf.browser.fromPixels(imageData, 3);
    imageTensor = imageTensor.expandDims(0);
    imageTensor = imageTensor.div(255).sub(0.5);
    imageTensor.print();

    let questionTensor = tf.tensor(questionBOW);
    questionTensor = questionTensor.expandDims(0);
    questionTensor.print();

    let output = model.predict([imageTensor, questionTensor]);
    let finalIdx = output.argMax(1).arraySync();

    console.log('Answer:', ANSWERS[finalIdx[0]]);
  })
  .catch(console.error);
}
