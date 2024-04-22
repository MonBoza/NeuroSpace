import React from 'react';
import Logo from '../assets/img/logo.jpeg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const Header = () => {

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [token, setToken] = useState("");
const [userName, setUserName] = useState("");
const navigate = useNavigate();


 const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUserName("");
    setIsAuthenticated(false);
    navigate("/");
  }
  return (
    <header className="shadow-lg position-fixed px-7">
      <div className="">
        <img 
          id='logo'
          src={Logo} 
          alt="Logo"
          className="h-1/5 w-1/5 rounded-1/2"
        />
      </div>
      <nav className="flex justify-between items-center py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl text-indigo-500 px-10 font-bold">Home</a>
          <a href="/resources" className="text-2xl text-indigo-500 px-10 font-bold">Resources</a>
          <a href="/ForumList" className="text-2xl text-indigo-500 px-10 font-bold">Forum</a>
        </div>
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
      </nav>
    </header>
  );
};

export default Header;

// add hamburger menu to the header