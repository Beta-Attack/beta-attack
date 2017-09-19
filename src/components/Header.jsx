import React from 'react';

import Button from './Button';

function Header() {
  return (
    <header>
      <nav>
        <Button buttonName="Pentest" />
        <Button buttonName="Library" />
      </nav>
    </header>
  );
}

export default Header;
