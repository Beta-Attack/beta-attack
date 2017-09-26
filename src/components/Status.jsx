import React from 'react';
import PropTypes from 'prop-types';
import StatusImg from './StatusImg';
import StatusGood from '../assets/status-good.png';
import StatusBad from '../assets/status-vulnerable.png';

const propTypes = {
  xssMessage: PropTypes.array,
};

const defaultProps = {
  xssMessage: [],
};

function Status(props) {
  let xssStatusImg = StatusGood;
  let sqlStatusImg = StatusGood;
  if (props.xssMessage.length > 0) xssStatusImg = StatusBad;
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
