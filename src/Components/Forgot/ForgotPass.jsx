import React, { useState } from 'react';
import './ForgotPass.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className='wrapper'>
      <form action=''>
        <h1>Change Password</h1>
        <div className="input-box">
          <input type='email' placeholder='Username' required/>
          <FaUser className='icon'/>
        </div>
        <div className="input-box">
          <input type='password' placeholder='Create New Password' pattern=".{8,}" title="Password must be at least 8 characters long" required/>
          <FaLock className='icon'/>
        </div>
        <div className="input-box">
          <input type='password' placeholder='Confirm New Password' pattern=".{8,}" title="Password must be at least 8 characters long" required/>
          <FaLock className='icon'/>
        </div>

        <button type='submit'><Link to='/login'>Apply Changes</Link></button>

      </form>
    </div>
  );
}

export default ForgotPassword