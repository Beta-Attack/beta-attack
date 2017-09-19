import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  buttonName: PropTypes.string.isRequired,
};

const defaultProps = {
  text: 'Button Component',
};

function Button(props) {
  return (
    <button type="button">
      { props.buttonName }
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
