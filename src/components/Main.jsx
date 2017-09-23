import React from 'react';
import PropTypes from 'prop-types';
import Pentest from './Pentest';
import Summary from './Summary';

const propTypes = {
  url: PropTypes.string.isRequired,
  handleURL: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
};

function Main(props) {
  return (
    <main>
      <Pentest
        url={props.url}
        handleURL={props.handleURL}
        send={() => { props.send(); }}
      />
      <Summary />
    </main>
  );
}

Main.propTypes = propTypes;

export default Main;
