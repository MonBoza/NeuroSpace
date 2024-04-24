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
    window.location.href = "/Register";
  };
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setToken("");
    setUserName("");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleSignIn = () => {
    window.location.href = "/SignIn";
  };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center bg-gray-100 p-8">
        <div className="lg:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Welcome to Neurospace
          </h1>
          <div className="max-w-prose mx-auto text-left py-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
              <p className="text-lg mb-4 text-gray-800">
                Here, we're on a journey to explore the fascinating world of
                neurodiversity.
              </p>
              <p className="text-lg mb-4 text-gray-800">
                Join our vibrant community where diversity is celebrated, and
                uniqueness is embraced!
              </p>
              <p className="text-lg mb-4 text-gray-800">
                Discover resources, make connections, and embark on an
                adventure of self-discovery.
              </p>
              <p className="text-lg mb-4 text-gray-800">
                Together, let's create a world where every mind shines bright
                with its own colors!
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleRegister}
              >
                Register For an Account
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:h-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
            <Resource />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;