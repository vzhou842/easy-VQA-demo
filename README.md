# easy-VQA-demo

A demo of a [Keras](https://keras.io/) model trained on the [easy-VQA](https://github.com/vzhou842/easy-VQA) (Easy Visual Question Answering) dataset.

The model used in the demo is closely based on [easy-VQA-keras](https://github.com/vzhou842/easy-VQA-keras).

See the demo live at https://easy-vqa-demo.victorzhou.com or read more in the [official easy-VQA blog post](https://victorzhou.com/blog/easy-vqa/).

## About the Demo

The demo web app was made using [create-react-app](https://github.com/facebook/create-react-app).

The demo model uses [TensorFlow.js](https://www.tensorflow.org/js) to run predictions using pre-trained weights directly in the browser.

The pre-trained Keras model is available at `public/model.h5`. It was converted to `public/model.json` using the official [TensorFlow.js converter](https://www.tensorflow.org/js/guide/conversion).

## Setup

```
git clone https://github.com/vzhou842/easy-VQA-demo.git
cd easy-VQA-demo
npm install
npm start
```
