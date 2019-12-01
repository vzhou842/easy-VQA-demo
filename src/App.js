import React, { useCallback, useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');

  const onSubmit = useCallback(e => {
    e.preventDefault();
    // TODO
    console.log(`Question: ${question}`);
  }, [question]);

  const onQuestionChange = useCallback(e => {
    setQuestion(e.target.value);
  }, [setQuestion]);

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>Enter a question:</label>
        <input
          type="text"
          placeholder="What color is the shape?"
          value={question}
          onChange={onQuestionChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
