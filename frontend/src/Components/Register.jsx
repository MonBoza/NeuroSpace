import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerUser, setRegisterUser] = useState({ username: "", email: "", password: "" });
  const [registerMessage, setRegisterMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/signup', registerUser);
      if (response.status === 200) {
        setRegisterMessage("Account created successfully!");
        setRegisterUser({ username: "", email: "", password: "" });
      } 
      navigate('/');
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
      <button onClick={handleRegister}>Register</button>

      <p>{registerMessage}</p>
    </div>
  );
};

export default Register;
