import React from 'react';
import Logowhite from '../assets/img/logogray.png';



const Header = () => {

  const handleButton = () => {
    if (!isAuthenticated) {
      display = { display: "none" };
    };
  }


 const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUserName("");
    setIsAuthenticated(false);
    navigate("/");
  }
  return (
    <header className="">
      <div className="">
        <img 
          id='logo'
          src={Logowhite} 
          alt="Logo"
          className="h-1/5 w-1/5 rounded-1/2"
        />
      </div>
      <nav className="flex justify-between items-center py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl  px-10 font-bold">Home</a>
          <a href="/resources" className="text-2xl px-10 font-bold">Resources</a>
          <a href="/ForumList" className="text-2xl px-10 font-bold">Forum</a>
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

// add hamburger menu to the header