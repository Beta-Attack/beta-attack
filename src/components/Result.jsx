import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  xssMessage: PropTypes.array,
};
const defaultProps = {
  xssMessage: [],
};

function Result(props) {
  let result = null;
  if (props.xssMessage.length === 0) {
    result = <p className="is-secure">Congratulations! You site is safe from most common XSS injections!</p>;
  }
  result = props.xssMessage.map((element, index) =>
    (
      <li key={index.toString()}>
        <p>{index + 1}: </p>
        <p>
          Injected Script:
          <span className="scripts">
            {element.script}
          </span>
        </p>
        <p>
          Vulnerable element:
          <span className="elementName">
            &lt;input {element.attribute}=&quot;{element.value}&quot;&gt;
          </span>
        </p>
        <p>
          Vulnerable URL:
          <span className="elementURL">
            {element.url}
          </span>
        </p>
      </li>
    ),
  );
  return (
    <article className="result-container">
      <h3>{props.name}</h3>
      <div className="result">
        <ul>{result}</ul>
      </div>
    </article>
  );
}

Result.propTypes = propTypes;
Result.defaultProps = defaultProps;

export default Result;
