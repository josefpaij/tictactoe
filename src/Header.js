import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { players } from './Game';

class Header extends React.Component {
  getWinnerMessage = () => {
    if (!this.props.winner) {
      return '';
    }
    return _.keys(players)[this.props.winner];
  }

  render() {
    const styles = getStyles();
    const message = this.getWinnerMessage();

    return (
      <div style={styles.header} id="header">
        <div style={styles.winnerBoard}>
          {message}
        </div>
        <div style={styles.resetButton} onClick={this.props.onGameReset}> 
          Reset game
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  winner: PropTypes.number,
}

export default Header;

const getStyles = () => {
  return {
    header: {
      display: 'grid',
      backgroundColor: 'white',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateAreas: '"a . b"',
    },
    winnerBoard: {
      gridArea: 'a',
      alignSelf: 'center',
      justifySelf: 'center',
    },
    resetButton: {
      gridArea: 'b',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '5px',
      color: 'black',
      alignSelf: 'center',
      justifySelf: 'center',
      padding: '10px',
      cursor: 'pointer',
    },
  };
};
