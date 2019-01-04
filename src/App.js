// @flow strict
import React, { Component } from 'react';
import './styles/App.scss';
import threeEntryPoint from './threejs/threeEntryPoint';
import Scorebar from './containers/ScorebarContainer';

export default class App extends Component<{}> {
  // eslint-disable-next-line react/sort-comp
  threeRootElement: ?HTMLDivElement;

  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }

  setThreeRef(element: ?HTMLDivElement) {
    this.threeRootElement = element;
  }

  render() {
    return (
      <div className="App" ref={element => this.setThreeRef(element)}>
        <Scorebar />
      </div>
    );
  }
}
