import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerUser, setRegisterUser] = useState({ username: "", email: "", password: "" });
  const [userProfile, setUserProfile] = useState({ bio: "", avatar: null });
  const [registerMessage, setRegisterMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Create the user account
      const response = await axios.post('http://127.0.0.1:8000/signup', registerUser);
      if (response.status === 201) { // Check for successful creation status
        setRegisterMessage("Account created successfully!");
        setRegisterUser({ username: "", email: "", password: "" });
        setUserProfile({ bio: "", avatar: null });
        const profileResponse = await axios.post('http://127.0.0.1:8000/userprofile/', userProfile);
        if (profileResponse.status === 201) {
          console.log('User profile created successfully:', profileResponse.data);
        } else if (profileResponse.status === 200) {
          console.log('User profile updated successfully:', profileResponse.data);
        }
        
        
        navigate('/');
      }
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      console.log(error.response.data);
      setRegisterMessage("There was a problem creating the account.");
    }
  };

  return (
    <div>
      <h1>Register For an Account</h1>
      <input 
        type="text" 
        placeholder="Username" 
        value={registerUser.username}
        onChange={(e) => setRegisterUser({ ...registerUser, username: e.target.value })} />
      <br/>
      <input 
        type="email" 
        placeholder="Email" 
        value={registerUser.email} 
        onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })}/>
      <br/>
      <input 
        type="password" 
        placeholder="Password" 
        value={registerUser.password} 
        onChange={(e) => setRegisterUser({...registerUser, password: e.target.value})}/>
      <br/>
      <textarea 
        placeholder="Bio" 
        value={userProfile.bio} 
        onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}/>
      <br/>
      <input 
        type="file" 
        onChange={(e) => setUserProfile({ ...userProfile, avatar: e.target.files[0] })}/>
      <br/>
      <button onClick={handleRegister}>Register</button>

      <p>{registerMessage}</p>
    </div>
  );
};

export default Register;
