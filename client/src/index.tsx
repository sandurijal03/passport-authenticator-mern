import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './main.css';
import Context from './Context';

ReactDOM.render(
  <Context>
    <App />
  </Context>,
  document.getElementById('root'),
);
