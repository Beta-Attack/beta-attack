import React from 'react';
import PropTypes from 'prop-types';
import Pentest from './Pentest';
import Status from './Status';
import Summary from './Summary';

const propTypes = {
  url: PropTypes.string.isRequired,
  handleURL: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  xssMessage: PropTypes.array,
};

const defaultProps = {
  buttonName: 'Send',
  click: () => {
    console.log('clicked!!');
  },
  xssMessage: [],
};

function Main(props) {
  return (
    <main>
      <Pentest
        url={props.url}
        handleURL={props.handleURL}
        send={props.send}
      />
      <Status xssMessage={props.xssMessage} />
      <Summary xssMessage={props.xssMessage} />
    </main>
  );
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
