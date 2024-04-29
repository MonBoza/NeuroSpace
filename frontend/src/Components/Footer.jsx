import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="position:absolute border-radius-10px bg-gray-300 opacity-90 p-4 text-center">
      <a href="https://github.com/MonBoza/NueroSpace.git" target="_blank"className="text-amber-600 flex items-center justify-center">
        <FaGithub className="mr-2" />
        Check out the Repo
      </a>
    </footer>
  );
};

export default Footer;