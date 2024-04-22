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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register For an Account</h1>
      <form>
        <input 
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          type="text" 
          placeholder="Username" 
          value={registerUser.username}
          onChange={(e) => setRegisterUser({ ...registerUser, username: e.target.value })} />
        <br/>
        <input 
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          type="email" 
          placeholder="Email" 
          value={registerUser.email} 
          onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })}/>
        <br/>
        <input 
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          type="password" 
          placeholder="Password" 
          value={registerUser.password} 
          onChange={(e) => setRegisterUser({...registerUser, password: e.target.value})}/>
        <br/>
        <textarea 
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          placeholder="Bio" 
          value={userProfile.bio} 
          onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}/>
        <br/>
        <input 
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          type="file" 
          onChange={(e) => setUserProfile({ ...userProfile, profile_pic: e.target.files[0] })}/>
        <br/>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button" 
          onClick={handleRegister}>Register</button>
      </form>
      <br/>
      <button className="bg-blue-500  mb-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/signin')}>Already a member? Sign In</button>
      <p>{registerMessage}</p>
    </div>
  );
};

export default Register;