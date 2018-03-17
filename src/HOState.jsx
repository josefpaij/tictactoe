import React from 'react';

// HOState
export default (Component) => {
  return class WrappedComponent extends React.Component {
    setRef = (ref) => {
      if (!this.component) {
        this.component = ref;
        this.component.stateSet = this.stateSet;
      }
    }

    stateSet = async (update) => {
      await new Promise(
        (resolve) => setTimeout(
          () => this.component.setState(update, resolve),
          100
        )
      );
    }

    render() {
      return <Component ref={this.setRef} />;
    }
  }
}