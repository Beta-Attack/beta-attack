import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  buttonName: PropTypes.string.isRequired,
  click: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
};
const defaultProps = {
  buttonName: 'Send',
  src: '',
  alt: '',
  click: () => {
    console.log('clicked!!');
  },
};

function Button(props) {
  return (
    <button
      type="button"
      onClick={props.click}
    >
      {props.alt !== '' &&
        <img src={props.src} alt={props.alt} />
      }
      { props.buttonName }
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
