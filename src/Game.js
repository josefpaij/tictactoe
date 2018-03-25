import React from 'react';
import _ from 'lodash';
import Cell from './Cell';

export const players = {
  NONE: 0,
  EX: 1,
  OH: 2,
};

const initialState = {
  cells: [],
  turn: players.EX,
  endGame: null,
};

class Game extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  isEmptyCell = (index) => !!this.state.cells[index]

  isGameOver = () => this.state.endGame || _.keys(this.state.cells).length === 9

  // alternates between EX and OH
  nextTurn = () => this.state.turn - players.EX || players.OH

  reset = () => this.setState(initialState)

  handleCellClick = (index) => {
    if (!this.isEmptyCell(index) && !this.state.endGame) {
      const { turn } = this.state;
      const cells = _.assign({}, this.state.cells, { [index]: turn });

      const state = {
        cells,
        turn: this.nextTurn(),
        prevTurn: turn,
      };

      this.setState(state, this.checkConditions);
    } else if (this.isGameOver()) {
      this.reset();
    }
  }

  checkConditions = () => {
    const turnPeices = _.pickBy(this.state.cells, c => c === this.state.prevTurn);

    const [endGame] = checkConds(turnPeices).filter(a => !!a);
    if (endGame) {
      this.setState({ endGame });
    }
  }

  render() {
    const cells = 
      _.times(9, (index) => (
        <Cell
          key={`cell-${index}`}
          index={index}
          onClick={this.handleCellClick}
          player={this.state.cells[index]}
          endGame={this.state.endGame}
          turn={this.state.turn}
        />
      ));

    return <div id="game-container">{cells}</div>;
  }
}

export default Game;

const checkConds = (peices) => ([
  (peices[0] && peices[1] && peices[2] && [0, 1, 2]),
  (peices[0] && peices[3] && peices[6] && [0, 3, 6]),
  (peices[0] && peices[4] && peices[8] && [0, 4, 8]),
  (peices[1] && peices[4] && peices[7] && [1, 4, 7]),
  (peices[2] && peices[4] && peices[6] && [2, 4, 6]),
  (peices[2] && peices[5] && peices[8] && [2, 5, 8]),
  (peices[3] && peices[4] && peices[5] && [3, 4, 5]),
  (peices[6] && peices[7] && peices[8] && [6, 7, 8]),
]);
