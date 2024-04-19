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
        const { token, user } = response.data; // Extract token from response
        setToken(token); // Save token to state
        setSignInMessage("Sign in successful!");
        setIsAuthenticated(true);
        setUserName(user.username); // Save username to state
        
        setSignInUser({username: "", password: "" }); // Clear input fields
        
        
      }
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      console.log(error.response.data);
      setSignInMessage("There was a problem signing in.");
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <UserProfile signInUser={signInUser} token={token} userName={userName}  />
      ) : (
        <>
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
            onChange={(e) => setSignInUser({ ...signInUser, password: e.target.value })}
          />
          <br />
          <button onClick={handleSignIn}>Sign In</button>
          <p>{signInMessage}</p>
        </>
      )}
    </div>
  );
};

export default SignIn;