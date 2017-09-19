import React from 'react';
import Main from './Main';
import Header from './Header';

const { Component } = React;
// Pentest Library

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Beta-Attack',
    };
  }
  render() {
    return (
      <div className="main">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
