import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TestComponent from './components/Test';

class App extends Component {

  constructor(props) {
    super(props);

    this.stats = [];
  }


  render() {
    return (
      <div>
        <h1>Hello, World</h1>
        <TestComponent name="Hallo" />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
