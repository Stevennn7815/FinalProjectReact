import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Update.css';

function Update() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/user/${id}`);
        if (res.data.length > 0) {
          setName(res.data[0].name);
          setEmail(res.data[0].email);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email) {
      alert("Please fill in both fields");
      return;
    }
    try {
      const res = await axios.put(`http://localhost:8081/update/${id}`, { name, email });
      console.log(res.data);
      navigate('/crud');
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className='update-container'>
      <div className='update-box'>
        <form onSubmit={handleSubmit}>
          <h2>Update User</h2>
          <div className='mb-2'>
            <label>Name</label>
            <input 
              type="text" 
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
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
