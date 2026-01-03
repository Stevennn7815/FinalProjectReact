import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

import user_icon from './Assets/user.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

const LogIn = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Log In");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleActionClick = async (buttonAction) => {
    if (action !== buttonAction) {
      setAction(buttonAction);
      setMessage('');
      return;
    }

    try {
      const url = buttonAction === "Sign Up"
        ? "http://localhost:5000/signup"
        : "http://localhost:5000/login";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setMessageType('success');

        setFormData({ name: '', email: '', password: '' });

        if (buttonAction === "Log In") {
          localStorage.setItem('user', JSON.stringify(data.user));
          setTimeout(() => navigate('/crud'), 1500);
        }
      } else {
        setMessage(data.message);
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
      setMessageType('error');
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="user" />
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="password" />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </div>

      {action === "Log In" && (
        <div className="forgot-password">
          Lost Password? <span>Click Here</span>
        </div>
      )}
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Log In" ? "submit gray" : "submit"}
          onClick={() => handleActionClick("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => handleActionClick("Log In")}
        >
          Log In
        </div>
      </div>
    </div>
  );
};

export default LogIn;
