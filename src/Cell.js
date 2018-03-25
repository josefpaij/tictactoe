import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';

const players = {
  NONE: 0,
  EX: 1,
  OH: 2,
};

const getColor = (player = players.NONE) => [
  'rgba(0, 0, 0, 0.3',
  'rgba(255, 0, 0, 1)',
  'rgba(0, 0, 255, 1)',
][player || 0]

class Cell extends React.Component {
  constructor() {
    super();
    this.state = { height: 100, width: 100 };
    window.addEventListener('resize', this.updateSize)
  }

  componentWillReceiveProps(props) {
    if (props.player !== this.props.player || props.endGame !== this.props.endGame) {
      this.renderShape(props);
    }
  }

  handleContainerLoaded = (ref) => {
    if (!this.cntr) {
      this.cntr = ref;
      this.updateSize();
    }
  }

  handleCanvasLoaded = (ref) => {
    if (!this.ctx) {
      this.ctx = ref.getContext('2d');
    }
  }

  handleMouseEnter = () => this.setState({ mouseover: true }, this.renderShape)

  handleMouseLeave = () => this.setState({ mouseover: false }, this.renderShape)

  handleClick = () => this.props.onClick(this.props.index)

  updateSize = () => {
    const height = this.cntr.clientHeight - 10;
    const width = this.cntr.clientWidth - 10;
    this.setState({ height, width }, this.renderShape);
  }

  getMinDimension = () => {
    const { height, width } = this.state;
    return height < width ? height : width;
  }

  isHovering = (props = this.props) => {
    return !props.player && !props.endGame && this.state.mouseover;
  }

  renderShape = (props = this.props) => {
    const hovering = this.isHovering(props);
    if (!this.ctx || !props.player || !hovering) {
      if (this.ctx) { 
        this.ctx.clearRect(5, 5, this.state.width, this.state.height);
      }
      if (!props.player && !hovering) {
        return;
      }
    }
    const color = getColor(!hovering && props.player);
    const d = this.getMinDimension() * 0.8;

    this.ctx.translate(this.state.width/2, this.state.height/2);
    if ((props.player === players.EX) || (hovering && props.turn === players.EX)) {
      // draw X
      this.ctx.rotate(Math.PI / 4);
      this.ctx.fillStyle = color;
      this.ctx.fillRect(-d/2, -1.5, d, 3);
      this.ctx.fillRect(-1.5, -d/2, 3, d);
    } else if ((props.player === players.OH) || (hovering && props.turn === players.OH)) {
      // draw O
      this.ctx.ellipse(0, 0, d/2 - 10, d/2 - 10, 0, 0, Math.PI * 2);
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
    
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    return;
  }

  render() {
    const styles = getStyles(this.props, this.state);
    return (
      <div
        style={styles}
        className="cell"
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={this.handleContainerLoaded}
      >
        <canvas
          width={`${this.state.width - 5}px`}
          height={`${this.state.height - 5}px`}
          ref={this.handleCanvasLoaded}
        />
      </div>
    );
  }
}
Cell.propTypes = {
  player: PropTypes.number,
  onClick: PropTypes.func,
  endGame: PropTypes.array,
  turn: PropTypes.number,
};
Cell.defaultProps = {
  player: players.NONE,
};

export default Cell;

const getStyles = ({ player, endGame, index }, state) => {
  let backgroundColor = Color({ r: 255, g: 255, b: 255, a: 0.2, });
  if (player === players.EX) {
    backgroundColor.alpha(0.4);
  } else if (player === players.OH) {
    backgroundColor.alpha(0.4);
  } else if (state.mouseover) {
    backgroundColor.alpha(0.6);
  }

  if (endGame) {
    const winningCell = endGame.includes(index);

    if (winningCell) {
      backgroundColor.alpha(0.4);
    } else {
      backgroundColor.alpha(0.1);
    }
  }

  return {
    backgroundColor: backgroundColor.rgbaString(),
    cursor: player !== players.NONE && !endGame ? 'default' : 'pointer',
    padding: 5,
  }
}
