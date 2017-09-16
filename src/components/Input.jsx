import React from 'react';
import Button from './Button';

const Input = function () {
  return (
    <div className="url-input">
      <input type="text" name="url" />
      <Button buttonName="Send" />
    </div>
  );
};

export default Input;
