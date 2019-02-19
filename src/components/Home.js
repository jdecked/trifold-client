// @flow strict
import React, { Component } from 'react';
import threeEntryPoint from '../threejs/threeEntryPoint';
import Scorebar from '../containers/ScorebarContainer';

// TODO (jdc): Render torus ring level select instead
export default class Home extends Component<{}> {
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
      <div className="Home" ref={element => this.setThreeRef(element)}>
        <Scorebar />
      </div>
    );
  }
}
