import React from 'react';
import Header from './Header';
import Main from './Main';

const { Component } = React;

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
