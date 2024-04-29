import { useState } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signInUser, setSignInUser] = useState({ username: "", password: "" });
  const [signInMessage, setSignInMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', signInUser);
      if (response.status === 201 || response.status === 215) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userprofile", user.userprofile) 
        setToken(token);
        setSignInMessage("Sign in successful!");
        setIsAuthenticated(true);
        setUserName(user.username);
        setSignInUser({ username: "", password: "" }); 
      }
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      setSignInMessage("There was a problem signing in.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-8">
        {isAuthenticated ? (
          <UserProfile signInUser={signInUser} token={token} userName={userName} />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">SIGN IN</h1>
            <input
              type="text"
              placeholder="Username"
              value={signInUser.username}
              onChange={(e) => setSignInUser({ ...signInUser, username: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInUser.password}
              onChange={(e) => setSignInUser({ ...signInUser, password: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <br />
            <button onClick={handleSignIn} className="bg-amber-500 text-white px-4 py-2 rounded-md">
              Sign In
            </button>
            <br />
            <p>{signInMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
