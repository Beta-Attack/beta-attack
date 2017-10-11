import React from 'react';
import PropTypes from 'prop-types';
import StatusImg from './StatusImg';
import StatusGood from '../assets/status-good.png';
import StatusBad from '../assets/status-vulnerable.png';

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

function Status(props) {
  let xssStatusImg = StatusGood;
  let sqlStatusImg = StatusGood;
  if (props.xssMessage.length > 0) xssStatusImg = StatusBad;
  if (props.sqlMessage.length > 0) sqlStatusImg = StatusBad;
  return (
    <section className="status">
      <h2>Status: </h2>
      <StatusImg
        name="XSS injection"
        src={xssStatusImg}
      />
      <StatusImg
        name="SQL injection"
        src={sqlStatusImg}
      />
    </section>
  );
}

Status.propTypes = propTypes;
Status.defaultProps = defaultProps;

export default Status;
