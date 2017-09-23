import React from 'react';
import axios from 'axios';

import Main from './Main';
import Header from './Header';

const { Component } = React;
// Pentest Library

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      message: '',
    };
  }
  handleURL(e) {
    const newUrl = e.target.value;
    this.setState({ url: newUrl });
    console.log('This is the state: ', this.state);
  }
  send() {
    axios.post('/attack', { url: this.state.url })
      .then((response) => {
        console.log('This is the reponse: ', response);
      });
  }
  render() {
    return (
      <div className="main">
        <Header />
        <Main
          url={this.state.url}
          handleURL={(e) => { this.handleURL(e); }}
          send={() => { this.send(); }}
        />
      </div>
    );
  }
}

export default App;
