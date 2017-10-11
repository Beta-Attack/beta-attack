import React from 'react';
import PropTypes from 'prop-types';
import Result from './Result';

const propTypes = {
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
  xssMessage: [],
  sqlMessage: [],
};

function Summary(props) {
  let xssResult = null;
  let sqlResult = null;
  if (props.xssMessage.length === 0) {
    xssResult = (<li className="is-secure">
      You site is safe from most common XSS injections!
    </li>);
  } else {
    xssResult = props.xssMessage.map((element, index) =>
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
  }
  if (props.sqlMessage.length === 0) {
    sqlResult = (<li className="is-secure">
      You site is safe from most common sql injections!
    </li>);
  } else {
    sqlResult = props.sqlMessage.map((element, index) =>
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
            Vulnerable URL:
            <span className="elementURL">
              {element.url}
            </span>
          </p>
        </li>
      ),
    );
  }

  return (
    <section className="summary">
      <h2>Summary: </h2>
      <Result
        name="XSS injection"
        className="result xss-result"

        result={xssResult}
      />
      <Result
        name="SQL injection"
        className="result sql-result"

        result={sqlResult}
      />
    </section>
  );
}

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
