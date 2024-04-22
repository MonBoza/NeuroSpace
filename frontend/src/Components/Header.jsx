import React from 'react';
import Logo from '../assets/img/logo.jpeg';

const Header = () => {
  return (
    <header className="">
      <div className="">
        <img 
          id='logo'
          src={Logo} 
          alt="Logo"
          className="h-1/5 w-1/5 rounded-1/2"
        />
      </div>
    </header>
  );
};

export default Header;

// add hamburger menu to the header