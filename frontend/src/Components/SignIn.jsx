import { useState } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signInUser, setSignInUser] = useState({ username: "", password: "" });
  const [signInMessage, setSignInMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(""); // [1
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', signInUser);
      if (response.status === 201 || response.status === 215) {
        setSignInMessage("Sign in successful!");
        setIsAuthenticated(true);
        setUserName(signInUser.username); // 
       
      }
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      console.log(error.response.data);
      setSignInMessage("There was a problem signing in.");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="Username"
        value={signInUser.username}
        onChange={(e) => setSignInUser({ ...signInUser, username: e.target.value })}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={signInUser.password}
        onChange={(e) => setSignInUser({ ...signInUser, password: e.target.value })} />
      <br />
      <button onClick={handleSignIn}>Sign In</button>
      <p>{signInMessage}</p>
      {isAuthenticated && <UserProfile username={signInUser.username} />}
    </div>
  );
};

export default SignIn;