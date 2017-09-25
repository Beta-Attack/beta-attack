import React from 'react';
import Result from './Result';

function Summary() {
  return (
    <section className="summary">
      <h2>Summary: </h2>
      <Result
        name="XSS injection"
      />
      <Result
        name="SQL injection"
      />
    </section>
  );
}

export default Summary;
