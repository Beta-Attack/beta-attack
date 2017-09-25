import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
};

function Result(props) {
  return (
    <article className="result-container">
      <h3>{props.name}</h3>
      <div className="result">
        <p>Lorem ipsum dolor sit amet,
          consectetur adipiscing elit,
          sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.</p>
      </div>
    </article>
  );
}

Result.propTypes = propTypes;

export default Result;
