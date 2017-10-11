import React from 'react';
import PropTypes from 'prop-types';
import Pentest from './Pentest';
import Status from './Status';
import Summary from './Summary';

const propTypes = {
  url: PropTypes.string.isRequired,
  handleURL: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  xssMessage: PropTypes.arrayOf(PropTypes.shape({
    script: React.PropTypes.string.isRequired,
    attribute: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  })),
  sqlMessage: PropTypes.arrayOf(PropTypes.shape({
    script: React.PropTypes.string.isRequired,
    attribute: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  })),
};

const defaultProps = {
  buttonName: 'Send',
  click: () => {
    console.log('clicked!!');
  },
  xssMessage: [],
  sqlMessage: [],
};

function Main(props) {
  return (
    <main>
      <Pentest
        url={props.url}
        handleURL={props.handleURL}
        send={props.send}
      />
      <Status
        xssMessage={props.xssMessage}
        sqlMessage={props.sqlMessage}
      />
      <Summary
        xssMessage={props.xssMessage}
        sqlMessage={props.sqlMessage}
      />
    </main>
  );
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
