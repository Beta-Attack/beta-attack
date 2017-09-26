import React from 'react';
import PropTypes from 'prop-types';
import Result from './Result';

const propTypes = {
  xssMessage: PropTypes.array,
};
const defaultProps = {
  xssMessage: [],
};

function Summary(props) {
  return (
    <section className="summary">
      <h2>Summary: </h2>
      <Result
        name="XSS injection"
        xssMessage={props.xssMessage}
      />
      <Result
        name="SQL injection"
      />
    </section>
  );
}

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
