import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(); 
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {email, password})
      .then(result => {
        console.log(result);
        if(result.data === "Success!") {
          localStorage.setItem('userEmail', email); // Store the email in local storage
          navigate('/home');
        }
        else {
          setError(result.data);
          setTimeout(() => setError(''), 1000);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='wrapper'>
      <form action='' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input type='email' placeholder='Username' required onChange={(e) => setEmail(e.target.value)}/>
          <FaUser className='icon'/>
        </div>
        <div className="input-box">
          <input type='password' placeholder='Password' pattern=".{8,}" title="Password must be at least 8 characters long" required onChange={(e) => setPassword(e.target.value)}/>
          <FaLock className='icon'/>
        </div>

        <div className="remember-forgot">
          <label><input type='checkbox'/>Remember me</label>
          <Link to='/forgotpassword'>Forgot Password?</Link>
        </div>

        <button type='submit'>Login</button>

        <div className="register-link">
          <p>Don't have an account? <Link to='/register'>Register</Link></p>         
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default LoginForm