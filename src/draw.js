import { CANVAS_SIZE, IMAGE_SIZE, MIN_SHAPE_SIZE, MAX_SHAPE_SIZE, COLORS } from './constants';
import { randint } from './utils';

const CANVAS_RATIO = CANVAS_SIZE / IMAGE_SIZE;
const MIN_CANVAS_SHAPE_SIZE = MIN_SHAPE_SIZE * CANVAS_RATIO;
const MAX_CANVAS_SHAPE_SIZE = MAX_SHAPE_SIZE * CANVAS_RATIO;

function drawBackground(context) {
  // The range (230, 255) matches the corresponding range in easy-VQA
  const r = randint(230, 255);
  const g = randint(230, 255);
  const b = randint(230, 255);
  context.fillStyle = `rgb(${r}, ${g}, ${b})`;
  context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function drawRectangle(context) {
  const w = randint(MIN_CANVAS_SHAPE_SIZE, MAX_CANVAS_SHAPE_SIZE);
  const h = randint(MIN_CANVAS_SHAPE_SIZE, MAX_CANVAS_SHAPE_SIZE);
  context.fillRect(randint(0, CANVAS_SIZE - w), randint(0, CANVAS_SIZE - h), w, h);
}

function drawCircle(context) {
  const r = randint(MIN_CANVAS_SHAPE_SIZE, MAX_CANVAS_SHAPE_SIZE) / 2;
  context.beginPath();
  context.arc(
    randint(r, CANVAS_SIZE - r),
    randint(r, CANVAS_SIZE - r),
    r,
    0,
    2 * Math.PI,
  );
  context.fill();
}

export function drawShape(context, shape, colorName) {
  drawBackground(context);

  context.fillStyle = COLORS[colorName];
  switch (shape) {
    case 'rectangle':
      drawRectangle(context);
      break;
    case 'circle':
      drawCircle(context);
    default:
      console.error('Invalid shape name provided', shape);
      break;
  }
}
