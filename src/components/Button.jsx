import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  buttonName: PropTypes.string.isRequired,
  click: PropTypes.func,
};

const defaultProps = {
  buttonName: 'Send',
  click: () => {
    console.log('clicked!!');
  },
};

function Button(props) {
  return (
    <button type="button" onClick={props.click} >
      { props.buttonName }
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
