import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerUser, setRegisterUser] = useState({ username: "", email: "", password: "" });
  const [userProfile, setUserProfile] = useState({ bio: "", profile_pic: null });
  const [registerMessage, setRegisterMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('username', registerUser.username);
      formData.append('email', registerUser.email);
      formData.append('password', registerUser.password);
      formData.append('bio', userProfile.bio);
      formData.append('profile_pic', userProfile.profile_pic);

      const response = await axios.post('http://127.0.0.1:8000/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        setRegisterMessage("Account created successfully!");
        setRegisterUser({ username: "", email: "", password: "" });
        setUserProfile({ bio: "", profile_pic: null });
        navigate('/');
      }
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      setRegisterMessage("There was a problem creating the account.");
    }
  };

  return (
    <div>
      <h1>Register For an Account</h1>
      <form>
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
          onChange={(e) => setUserProfile({ ...userProfile, profile_pic: e.target.files[0] })}/>
        <br/>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
      <p>{registerMessage}</p>
    </div>
  );
};

export default Register;
