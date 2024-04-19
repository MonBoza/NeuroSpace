import React from "react";

const Home = () => {
  const handleRegister = () => {
    window.location.href = '/Register';
  }
  
  const handleSignIn = () => {
    window.location.href = '/SignIn';
  }    

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Website</h1>
      <div className="flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignIn}>Sign In</button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Home;
