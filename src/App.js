import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import HOState from './HOState';
import styles from './App.styles';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: _.isFinite(props.count) ? props.count : 0 };
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1.5 });
  }

  render() {
    return (
      <div style={styles.container}>
        <div
          id="button"
          style={styles.button}
          onClick={this.handleClick}
        >
          click me&nbsp;
          {this.state && this.state.count || ''}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  count: PropTypes.number,
};

export default App;
