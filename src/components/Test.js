import React, { Component } from 'react';

class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  render() {
    return (
      <div>
        <p>A pretty test component {this.props.name}</p>
      </div>
    );
  }

}

export default Test;
