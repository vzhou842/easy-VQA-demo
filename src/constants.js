// All of these constants should be kept in sync with their counterparts in easy-VQA,
// the repo that contains the code to generate the dataset.

const WORD_INDEX = {'is': 1, 'shape': 2, 'the': 3, 'a': 4, 'image': 5, 'there': 6, 'not': 7, 'what': 8, 'in': 9, 'does': 10, 'contain': 11, 'present': 12, 'color': 13, 'no': 14, 'triangle': 15, 'circle': 16, 'rectangle': 17, 'green': 18, 'gray': 19, 'blue': 20, 'black': 21, 'brown': 22, 'teal': 23, 'yellow': 24, 'red': 25, 'of': 26};
const ANSWERS = ['no', 'rectangle', 'circle', 'yes', 'teal', 'blue', 'green', 'yellow', 'gray', 'black', 'brown', 'red', 'triangle'];

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
