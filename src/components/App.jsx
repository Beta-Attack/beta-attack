import React from 'react';
import axios from 'axios';

import Sidebar from './Sidebar';
import Main from './Main';

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
  }
  send() {
    axios.post('/attack', { url: this.state.url })
      .then((response) => {
        console.log('This is the reponse: ', response);
      });
  }
  render() {
    return (
      <section className="app">
        <Sidebar />
        <Main
          url={this.state.url}
          handleURL={(e) => { this.handleURL(e); }}
          send={() => { this.send(); }}
        />
      </section>
    );
  }
}

export default App;
