import React, { useState } from 'react';
import './SignUpForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/register', { email, password })
      .then(result => {
        console.log(result)
        if (result.data === "This user already exists. Please try another.") {
          setError(result.data);
          setTimeout(() => setError(''), 1000);
        }
        else {
          navigate('/login')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='wrapper'>
      <form action='' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="input-box">
          <input type='email' placeholder='New Username' required onChange={(e) => setEmail(e.target.value)} />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type='password' placeholder='New Password' pattern=".{8,}" title="Password must be at least 8 characters long" required onChange={(e) => setPassword(e.target.value)} />
          <FaLock className='icon' />
        </div>

        <button type='submit'><Link to=''>Register</Link></button>

        <div className="register-link">
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default SignUpForm