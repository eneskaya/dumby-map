import React, { Component } from 'react';

import io from 'socket.io-client';

class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.initializeListeners();
  }

  initializeListeners() {
    const socket = io.connect();
    socket.on('stats', (data) => this.setState({ data: this.state.data.concat(data) }));
  }

  render() {

    const data = this.state.data;

    return (
      <ul>
        { data.map((item) => { return <li>{item.new_val.query_engine.queries_per_sec}</li> }) }
      </ul>
    );
  }

}

export default Test;
