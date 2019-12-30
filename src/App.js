import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { getInference, loadModelPromise } from './model';
import { IMAGE_SIZE, MIN_SHAPE_SIZE, MAX_SHAPE_SIZE, COLORS } from './constants';
import { randint } from './utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const CANVAS_SIZE = 256;
const CANVAS_RATIO = CANVAS_SIZE / IMAGE_SIZE;
const MIN_CANVAS_SHAPE_SIZE = MIN_SHAPE_SIZE * CANVAS_RATIO;
const MAX_CANVAS_SHAPE_SIZE = MAX_SHAPE_SIZE * CANVAS_RATIO;

const SAMPLE_QUESTIONS = [
  'What color is the shape?',
  'Is there a blue shape in the image?',
  'Is there a red shape?',
  'Is there a green shape in the image?',
  'Is there a black shape?',
  'Does the image contain a rectangle?',
  'What shape is present?',
  'Is no triangle present?',
  'Is a circle present?',
  'Is a rectangle present?',
  'What is the color of the shape?',
  'What shape does the image contain?',
];

const randomQuestion = () => SAMPLE_QUESTIONS[randint(0, SAMPLE_QUESTIONS.length - 1)];

function App() {
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
    const ctx = smallCanvas.current.getContext('2d');
    const ratio = IMAGE_SIZE / CANVAS_SIZE;
    ctx.scale(ratio, ratio);
  }, [smallCanvas.current]);

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
    context.fillRect(randint(0, CANVAS_SIZE - w), randint(0, CANVAS_SIZE - h), w, h);

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
            <canvas
              ref={mainCanvas}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              style={{ marginBottom: 10 }}
            />
            <canvas
              ref={smallCanvas}
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              style={{ display: 'none' }}
            />
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
