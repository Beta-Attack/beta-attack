import React from 'react';
import PropTypes from 'prop-types';
import Pentest from './Pentest';
import Status from './Status';
import Summary from './Summary';

const propTypes = {
  url: PropTypes.string.isRequired,
  handleURL: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
};

const defaultProps = {
  buttonName: 'Send',
  click: () => {
    console.log('clicked!!');
  },
};

function Button(props) {
  return (
    <main>
      <Pentest
        url={props.url}
        handleURL={props.handleURL}
        send={props.send}
      />
      <Status />
      <Summary />
    </main>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;