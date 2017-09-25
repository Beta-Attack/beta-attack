import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function StatusImg(props) {
  return (
    <article>
      <img src={props.src} alt="placeholder" />
      <p>{props.name}</p>
    </article>
  );
}

StatusImg.propTypes = propTypes;

export default StatusImg;
