import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  result: PropTypes.arrayOf(PropTypes.string.isRequired),
};
const defaultProps = {
  result: [],
};

function Result(props) {
  return (
    <article className="result-container">
      <h3>{props.name}</h3>
      <div className={props.className}>
        <ul>{props.result}</ul>
      </div>
    </article>
  );
}

Result.propTypes = propTypes;
Result.defaultProps = defaultProps;

export default Result;
