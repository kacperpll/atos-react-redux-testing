import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('renders without crashing with props all = false', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App all={false}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
