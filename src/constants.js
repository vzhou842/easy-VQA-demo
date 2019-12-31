// All of these constants should be kept in sync with their counterparts in easy-VQA,
// the repo that contains the code to generate the dataset.

const WORD_INDEX = {'is': 1, 'shape': 2, 'the': 3, 'a': 4, 'image': 5, 'there': 6, 'not': 7, 'what': 8, 'does': 9, 'contain': 10, 'in': 11, 'present': 12, 'color': 13, 'no': 14, 'triangle': 15, 'rectangle': 16, 'circle': 17, 'teal': 18, 'gray': 19, 'brown': 20, 'blue': 21, 'green': 22, 'yellow': 23, 'red': 24, 'black': 25, 'of': 26};
const ANSWERS = ['green', 'triangle', 'no', 'rectangle', 'gray', 'red', 'blue', 'yes', 'circle', 'black', 'yellow', 'brown', 'teal'];

const CANVAS_SIZE = 256;
const IMAGE_SIZE = 64;
const MIN_SHAPE_SIZE = IMAGE_SIZE / 8;
const MAX_SHAPE_SIZE = IMAGE_SIZE / 2;

const COLORS = {
  black: 'black',
  gray: 'rgb(128, 128, 128)',
  red: 'red',
  green: 'green',
  blue: 'blue',
  yellow: 'yellow',
  teal: 'teal',
  brown: 'rgb(165, 42, 42)',
};
const COLOR_NAMES = Object.keys(COLORS);

const SHAPES = [
  'rectangle',
  'circle',
  'triangle',
];

export {
  WORD_INDEX,
  ANSWERS,
  CANVAS_SIZE,
  IMAGE_SIZE,
  MIN_SHAPE_SIZE,
  MAX_SHAPE_SIZE,
  COLORS,
  COLOR_NAMES,
  SHAPES,
};
