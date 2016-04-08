import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TestComponent from './components/Test';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Hello, world</h1>
        <TestComponent name="Enes" />
        <TestComponent name="Dilan" />
        <TestComponent name="Sehriban" />
        <TestComponent name="Aynur" />
        <TestComponent name="Ömer" />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
