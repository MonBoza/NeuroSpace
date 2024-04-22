import React from "react";

const Home = () => {
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
    <div className="min-h-screen flex flex-col justify-center items-center shadow-lg">
      <h1 className="text-4xl font-bold mb-8">Welcome to Neurospace</h1>
    
      <div className="max-w-prose mx-auto text-center py-8 statement">
  <div className="card border border-gray-500 px-22 bg-gray-300 p-4 rounded-lg shadow-md">
    <p className="text-lg mb-4">Here, we're on a journey to explore the fascinating world of neurodiversity.</p>
    <p className="text-lg mb-4">Join our vibrant community where diversity is celebrated, and uniqueness is embraced!</p>
    <p className="text-lg mb-4">Discover resources, make connections, and embark on an adventure of self-discovery.</p>
    <p className="text-lg mb-4">Together, let's create a world where every mind shines bright with its own colors!</p>
  </div>
</div>


      <div className="flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignIn}>Sign In</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRegister}>Register</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Home;

// style home to match header
