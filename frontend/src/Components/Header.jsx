import React, { useState, useEffect } from 'react';
import Neurospace from '../assets/img/Neurospace.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("username");

    if (storedToken && storedUserName) {
      setToken(storedToken);
      setUserName(storedUserName);
      setIsAuthenticated(true);
  
      fetchUserProfile(storedUserName);
    }
  }, []);

  const fetchUserProfile = (username) => {
    axios.get(`http://127.0.0.1:8000/userprofile/${username}/`)
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUserName("");
    setIsAuthenticated(false);
    setUserProfile(null);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow-lg position-fixed px-7 " aria-label="Main navigation">
      <div className="flex justify-between items-center py-4">
        <div>
          <img 
            src={Neurospace} 
            alt="NeuroSpace Logo"
            className="h-1/4 w-1/4 rounded-1/2 logo"
          />
        </div>
        <ul className="hidden lg:flex items-center space-x-4">
          <li>
            <a href="/" className="text-2xl text-indigo-500 px-10 font-bold">Home</a>
          </li>
          <li>
            <a href="/resources" className="text-2xl text-indigo-500 px-10 font-bold">Resources</a>
          </li>
          <li>
            <a href="/ForumList" className="text-2xl text-indigo-500 px-10 font-bold">Forum</a>
          </li>
          <li>
            <a href="/userprofile" className="text-2xl text-indigo-500 px-10 font-bold">Profile</a>
          </li>
        </ul>
        {isAuthenticated && userProfile && (
          <div className="text-white center">
            <img 
              src={`http://127.0.0.1:8000/${userProfile?.profile_pic}`} 
              alt={`Profile Picture of ${userName}`}
              className="mb-4 w-10 h-10 rounded-full" 
            />
            <div>
              <h3 className='text-bold text-red-700'>{userName}</h3>
            </div>
          </div>
        )}
        <div>
          {isAuthenticated ? (
            <button 
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold  px-4 rounded" 
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => navigate('/signin')} 
              className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </button>
          )}
        </div>
        <button 
          className="block lg:hidden text-2xl text-indigo-500 ml-auto" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          &#9776; 
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 py-4">
          <a href="/" className="block text-lg text-indigo-500 px-4 py-2 border-b border-gray-300">Home</a>
          <a href="/resources" className="block text-lg text-indigo-500 px-4 py-2 border-b border-gray-300">Resources</a>
          <a href="/ForumList" className="block text-lg text-indigo-500 px-4 py-2 border-b border-gray-300">Forum</a>
          <a href="/userprofile" className="block text-lg text-indigo-500 px-4 py-2 border-b border-gray-300">Profile</a>
        </div>
      )}
 
      {isMenuOpen && (
        <div className="lg:hidden py-4">
          {isAuthenticated ? (
            <button 
              className="block text-lg text-indigo-500 px-4 py-2 mx-auto" 
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={() => navigate('/signin')} 
              className="block text-lg text-indigo-500 px-4 py-2 mx-auto"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;