import React from 'react';
import StatusImg from './StatusImg';
import StatusGood from '../assets/status-good.png';
import StatusBad from '../assets/status-vulnerable.png';

function Status() {
  return (
    <section className="status">
      <h2>Status: </h2>
      <StatusImg
        name="XSS injection"
        src={StatusGood}
      />
      <StatusImg
        name="SQL injection"
        src={StatusBad}
      />
    </section>
  );
}

export default Status;
