import React, { Component } from 'react';
import './styles/App.scss';
import threeEntryPoint from './threejs/threeEntryPoint';
import Scorebar from './containers/ScorebarContainer';

export default class App extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }

  setThreeRef(element) {
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
