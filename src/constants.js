const WORD_INDEX = {'the': 1, 'shape': 2, 'is': 3, 'a': 4, 'image': 5, 'what': 6, 'in': 7, 'does': 8, 'contain': 9, 'present': 10, 'there': 11, 'not': 12, 'color': 13, 'no': 14, 'triangle': 15, 'circle': 16, 'rectangle': 17, 'of': 18, 'green': 19, 'brown': 20, 'teal': 21, 'gray': 22, 'blue': 23, 'black': 24, 'yellow': 25, 'red': 26};
const ANSWERS = ['teal', 'yellow', 'triangle', 'no', 'yes', 'brown', 'circle', 'blue', 'black', 'red', 'gray', 'green', 'rectangle'];

// These should be kept in sync with the corresponding constants in easy-VQA,
// the repo that contains the code to generate the dataset.
const IMAGE_SIZE = 64;
const MIN_SHAPE_SIZE = IMAGE_SIZE / 8;;
const MAX_SHAPE_SIZE = IMAGE_SIZE / 2

export {
  WORD_INDEX,
  ANSWERS,
  IMAGE_SIZE,
  MIN_SHAPE_SIZE,
  MAX_SHAPE_SIZE,
};
