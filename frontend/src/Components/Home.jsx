import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Resource from "./Resource";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleRegister = () => {
    window.location.href = '/Register';
  }
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUserName("");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleSignIn = () => {
    window.location.href = '/SignIn';
  }

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row justify-between items-start bg-gradient-to-br from-purple-200 to-blue-200 shadow-lg p-8">
        <div className="lg:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-8 text-white">Welcome to Neurospace</h1>
          <div className="max-w-prose mx-auto text-left py-8">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
              <p className="text-lg mb-4 text-gray-800">Here, we're on a journey to explore the fascinating world of neurodiversity.</p>
              <p className="text-lg mb-4 text-gray-800">Join our vibrant community where diversity is celebrated, and uniqueness is embraced!</p>
              <p className="text-lg mb-4 text-gray-800">Discover resources, make connections, and embark on an adventure of self-discovery.</p>
              <p className="text-lg mb-4 text-gray-800">Together, let's create a world where every mind shines bright with its own colors!</p>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignIn}>Sign In</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRegister}>Register</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
        <div className="lg:w-1/2 lg:h-auto p-4">
          <div className="flex justify-end">
            <Resource />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

// style home to match header
