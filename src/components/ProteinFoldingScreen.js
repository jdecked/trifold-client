// @flow strict
import React, { Component } from 'react';
import '../styles/ProteinFoldingScreen.scss';
import threeEntryPoint from '../threejs/threeEntryPoint';
import ScorebarContainer from '../containers/ScorebarContainer';

export default class ProteinFoldingScreen extends Component<{}> {
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
      <div
        className="ProteinFoldingScreen"
        ref={element => this.setThreeRef(element)}
      >
        <ScorebarContainer />
      </div>
    );
  }
}
