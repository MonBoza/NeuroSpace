import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Neurospace from '../assets/img/Neurospace.png'

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  setUserName
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/register');
  };


  return (
    <>
   
      <div className="min-h-screen flex flex-col justify-between items-center bg-gray-200 p-8 relative">
        <div className="mt-auto">
        <div className="mt-8 left-0 right-0 p-4">
        <img src={Neurospace} className=" mx-auto max-h-82 max-w-82 logo" />
        </div>
          <h1 className="text-6xl text-transform: uppercase font-bold text-center mb-8">
            Welcome to Neurospace {userName? userName : ""}
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 text-lg text-gray-800">
            <p className="mb-4">
              Here, we're on a journey to explore the fascinating world of
              neurodiversity.
            </p>
            <p className="mb-4">
              Join our vibrant community where diversity is celebrated, and
              uniqueness is embraced!
            </p>
            <p className="mb-4">
              Discover resources, make connections, and embark on an adventure
              of self-discovery.
            </p>
            <p className="mb-4">
              Together, let's create a world where every mind shines bright
              with its own colors!
            </p>
            <button
              className="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 mb-8 px-4 rounded-full mt-6 block mx-auto"
              onClick={handleRegister}
            >
              Register For an Account
            </button>
          </div>
        </div>
        
        <div className="mb-8 px-4 mt-10 py-4">
          <h1 className="text-6xl text-transform: uppercase font-bold text-center mb-8">
            About Us
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 text-lg text-gray-800">
            <p className="mb-4">
              Neurospace was born from the essence of Timothy, Ethan, and
              Parker, embodying the very spirit of their being.
              <p className="mb-4"> 
              These remarkable individuals serve as shining examples, encompassing
              qualities we should all aspire to emulate.</p>
            </p>
           
          </div>
        </div>
      </div>
      
       
       
      
    </>
  );
};

export default Home;