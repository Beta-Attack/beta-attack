import React from 'react';
import Button from './Button';
import PentestIcon from '../assets/pentest-icon.png';

import Logo from '../assets/logo.png';

function Header() {
  return (
    <section className="sidebar">
      <nav>
        <img src={Logo} alt="logo" />
        <Button
          buttonName="Pentest"
          src={PentestIcon}
          alt="pentest icon"
        />
        <Button
          buttonName="Library"
        />
      </nav>
    </section>
  );
}

export default Header;
