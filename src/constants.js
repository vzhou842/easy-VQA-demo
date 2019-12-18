// All of these constants should be kept in sync with their counterparts in easy-VQA,
// the repo that contains the code to generate the dataset.

const WORD_INDEX = {'the': 1, 'shape': 2, 'is': 3, 'a': 4, 'image': 5, 'what': 6, 'does': 7, 'contain': 8, 'in': 9, 'present': 10, 'not': 11, 'there': 12, 'color': 13, 'no': 14, 'triangle': 15, 'circle': 16, 'rectangle': 17, 'of': 18, 'red': 19, 'yellow': 20, 'teal': 21, 'black': 22, 'green': 23, 'blue': 24, 'brown': 25, 'gray': 26};
const ANSWERS = ['rectangle', 'brown', 'red', 'black', 'blue', 'green', 'gray', 'no', 'teal', 'triangle', 'yes', 'circle', 'yellow'];

const IMAGE_SIZE = 64;
const MIN_SHAPE_SIZE = IMAGE_SIZE / 8;
const MAX_SHAPE_SIZE = IMAGE_SIZE / 2;

const COLORS = [
  'black',
  'rgb(128, 128, 128)', // gray
  'red',
  'green',
  'blue',
  'yellow',
  'teal',
  'rgb(165, 42, 42)', // brown
];

export {
  WORD_INDEX,
  ANSWERS,
  IMAGE_SIZE,
  MIN_SHAPE_SIZE,
  MAX_SHAPE_SIZE,
  COLORS,
};
