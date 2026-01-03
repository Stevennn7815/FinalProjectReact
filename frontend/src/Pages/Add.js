import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Add.css';

function Add() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/add', { name, email })
      .then(res => {
        console.log(res.data);
        navigate('/crud');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='add-container'>
      <div className='add-box'>
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className='mb-2'>
            <label>Name</label>
            <input 
              type="text" 
              placeholder='Enter Name' 
              className='form-control'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <label>Email</label>
            <input 
              type="email" 
              placeholder='Enter Email' 
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
