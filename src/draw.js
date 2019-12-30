import { CANVAS_SIZE, IMAGE_SIZE, MIN_SHAPE_SIZE, MAX_SHAPE_SIZE, COLORS } from './constants';
import { randint } from './utils';

const CANVAS_RATIO = CANVAS_SIZE / IMAGE_SIZE;
const MIN_CANVAS_SHAPE_SIZE = MIN_SHAPE_SIZE * CANVAS_RATIO;
const MAX_CANVAS_SHAPE_SIZE = MAX_SHAPE_SIZE * CANVAS_RATIO;

export function drawRectangle(context, colorName) {
  // Background color
  // The range (230, 255) matches the corresponding range in easy-VQA
  const r = randint(230, 255);
  const g = randint(230, 255);
  const b = randint(230, 255);
  context.fillStyle = `rgb(${r}, ${g}, ${b})`;
  context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Shape
  context.fillStyle = COLORS[colorName];
  const w = randint(MIN_CANVAS_SHAPE_SIZE, MAX_CANVAS_SHAPE_SIZE);
  const h = randint(MIN_CANVAS_SHAPE_SIZE, MAX_CANVAS_SHAPE_SIZE);
  context.fillRect(randint(0, CANVAS_SIZE - w), randint(0, CANVAS_SIZE - h), w, h);
}
