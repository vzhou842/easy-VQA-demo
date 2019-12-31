import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { drawShape } from './draw';
import { getInference, loadModelPromise } from './model';
import { CANVAS_SIZE, IMAGE_SIZE, COLOR_NAMES, SHAPES } from './constants';
import { randint } from './utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const SAMPLE_QUESTIONS = [
  'What color is the shape?',
  'Is there a blue shape in the image?',
  'Is there a red shape?',
  'Is there a green shape in the image?',
  'Is there a black shape?',
  'Is there not a teal shape in the image?',
  'Does the image contain a rectangle?',
  'Does the image not contain a circle?',
  'What shape is present?',
  'Is no triangle present?',
  'Is a circle present?',
  'Is a rectangle present?',
  'Is there a triangle?',
  'What is the color of the shape?',
  'What shape does the image contain?',
];

const randomQuestion = () => SAMPLE_QUESTIONS[randint(0, SAMPLE_QUESTIONS.length - 1)];

function App() {
  const [color, setColor] = useState(null);
  const [shape, setShape] = useState(null);
  const [question, setQuestion] = useState(randomQuestion());
  const [answer, setAnswer] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [predicting, setPredicting] = useState(false);

  const mainCanvas = useRef(null);
  const smallCanvas = useRef(null);

  const onPredict = useCallback(() => {
    setPredicting(true);
  }, [setPredicting]);

  useEffect(() => {
    if (smallCanvas.current) {
      const ctx = smallCanvas.current.getContext('2d');
      const ratio = IMAGE_SIZE / CANVAS_SIZE;
      ctx.scale(ratio, ratio);
    }
  }, [smallCanvas]);

  useEffect(() => {
    if (predicting) {
      // Draw the main canvas to our smaller, correctly-sized canvas
      const ctx = smallCanvas.current.getContext('2d');
      ctx.drawImage(mainCanvas.current, 0, 0);

      getInference(smallCanvas.current, question).then(answer => {
        setAnswer(answer);
        setPredicting(false);
      });
    }
  }, [predicting, question]);

  const onQuestionChange = useCallback(
    e => {
      setQuestion(e.target.value);
      setAnswer(null);
    },
    [setQuestion]
  );

  const randomizeImage = useCallback(() => {
    const context = mainCanvas.current.getContext('2d');
    const colorName = COLOR_NAMES[randint(0, COLOR_NAMES.length - 1)];
    const shape = SHAPES[randint(0, SHAPES.length - 1)];

    drawShape(context, shape, colorName);

    setColor(colorName);
    setShape(shape);
    setAnswer(null);
  }, [mainCanvas]);

  const randomizeQuestion = useCallback(() => {
    let q = question;
    while (q === question) {
      q = randomQuestion();
    }
    setQuestion(q);
    setAnswer(null);
  }, [question, setQuestion]);

  useEffect(() => {
    randomizeImage();

    loadModelPromise.then(() => {
      setModelLoaded(true);
    });
  }, []);

  return (
    <div className="root">
      <h1>easy-VQA Demo</h1>
      <div className="container">
        <Card>
          <Card.Header>The Image</Card.Header>
          <Card.Body>
            <canvas ref={mainCanvas} width={CANVAS_SIZE} height={CANVAS_SIZE} />
            <canvas
              ref={smallCanvas}
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              style={{ display: 'none' }}
            />
            <figcaption className="image-caption">
              A <b>{color}</b>, <b>{shape}</b> shape.
            </figcaption>
            <br />
            <Card.Text>Want a different image?</Card.Text>
            <Button onClick={randomizeImage} disabled={predicting}>
              Random Image
            </Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>The Question</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="formQuestion">
                <Form.Control
                  as="textarea"
                  placeholder={SAMPLE_QUESTIONS[0]}
                  value={question}
                  onChange={onQuestionChange}
                  disabled={predicting}
                />
              </Form.Group>
            </Form>
            <Card.Text>Want a different question?</Card.Text>
            <Button onClick={randomizeQuestion} disabled={predicting}>
              Random Question
            </Button>
          </Card.Body>
        </Card>
      </div>
      <Button variant="success" size="lg" onClick={onPredict} disabled={!modelLoaded || predicting}>
        {modelLoaded ? (predicting ? 'Predicting...' : 'Predict') : 'Loading model...'}
      </Button>
      <br />
      {!!answer ? (
        <Alert variant="primary">
          Prediction: <b>{answer}</b>
        </Alert>
      ) : predicting ? (
        <Alert variant="light">The prediction will appear here soon...</Alert>
      ) : (
        <Alert variant="light">Click Predict!</Alert>
      )}
    </div>
  );
}

export default App;
