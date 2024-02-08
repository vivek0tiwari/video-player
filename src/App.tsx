import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Recorder } from './components/RecorderPreview';

function App() {
  return (
    <div className="App">
      <header >
        <h1>Recorder</h1>
        <Recorder/>
      </header>
    </div>
  );
}

export default App;
