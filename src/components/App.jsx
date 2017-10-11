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
      xssMessage: [],
      sqlMessage: [],
      load: false,
    };
  }
  handleURL(e) {
    const newUrl = e.target.value;
    this.setState({ url: newUrl });
  }
  send() {
    this.setState({ load: true });
    axios.post('/attack', { url: this.state.url })
      .then((response) => {
        this.setState({
          xssMessage: response.data.xss,
          sqlMessage: response.data.sql,
          load: false,
        });
      });
  }
  render() {
    return (
      <section className="app">
        {
          this.state.load === true &&
          <div className="load">
            <p>Bot is working...</p>
          </div>
        }
        <Sidebar />
        <Main
          url={this.state.url}
          handleURL={(e) => { this.handleURL(e); }}
          send={() => { this.send(); }}

          xssMessage={this.state.xssMessage}
          sqlMessage={this.state.sqlMessage}
        />
      </section>
    );
  }
}

export default App;
