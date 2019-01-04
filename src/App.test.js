import React from 'react';
import ReactDOM from 'react-dom';

it('is a reminder to install enzyme & eventually write tests', () => {
  const div = document.createElement('div');
  ReactDOM.render(<div />, div);
  ReactDOM.unmountComponentAtNode(div);
});
