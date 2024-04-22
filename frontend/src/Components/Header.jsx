import React, { useState } from 'react';
import Logo from '../assets/img/logo.jpeg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUserName("");
    setIsAuthenticated(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="shadow-lg position-fixed px-7">
      <div className="flex justify-between items-center py-4">
        <div>
          <img 
            id='logo'
            src={Logo} 
            alt="Logo"
            className="h-1/4 w-1/4 rounded-1/2"
          />
        </div>
        <nav className="hidden lg:flex items-center">
          <a href="/" className="text-2xl text-indigo-500 px-10 font-bold">Home</a>
          <a href="/resources" className="text-2xl text-indigo-500 px-10 font-bold">Resources</a>
          <a href="/ForumList" className="text-2xl text-indigo-500 px-10 font-bold">Forum</a>
        </nav>
        <div>
          {isAuthenticated ? (
            <button className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button onClick={() => navigate('/signin')} className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          )}
        </div>
        <button className="block lg:hidden text-2xl text-indigo-500 ml-auto" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 py-4">
          <a href="/" className="block text-lg text-indigo-500 px-4 py-2 border-b border-gray-300">Home</a>
          <a href="/resources" className="block text-lg text-indigo-500 px-4 py-2 border-b border-gray-300">Resources</a>
          <a href="/ForumList" className="block text-lg text-indigo-500 px-4 py-2 border-b border-gray-300">Forum</a>
        </div>
      )}
      {/* Sign In/Sign Out button for mobile */}
      {isMenuOpen && (
        <div className="lg:hidden py-4">
          {isAuthenticated ? (
            <button className="block text-lg text-indigo-500 px-4 py-2 mx-auto" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button onClick={() => navigate('/signin')} className="block text-lg text-indigo-500 px-4 py-2 mx-auto">
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
