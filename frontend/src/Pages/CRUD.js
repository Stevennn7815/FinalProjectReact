import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CRUD.css';

function CRUD() {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setUserName(user.name);
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/user/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="crud-container">
            <header className="crud-header">
                <h3>Track Build Align</h3>
                <div className="user-info">
                    <span>Good Day, {userName}</span>
                    <button className="settings-btn" onClick={handleSettings}>Settings</button>
                    <button className="logout-btn" onClick={handleLogout}>Log Out</button>
                </div>
            </header>

            <main className="crud-main">
                <div className="crud-box">
                    <div className="table-header">
        <h2 className="table-title">Track Build Align</h2>
        <Link to="/add" className="add-btn">Add +</Link>
    </div>

    <table className="crud-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th className="action-col">Action</th>
            </tr>
        </thead>
        <tbody>
            {users.map((data, i) => (
                <tr key={i}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td className="action-col">
                        <div className="action-buttons">
                            <Link to={`/update/${data.id}`} className="update-btn">Update</Link>
                            <button className="delete-btn" onClick={() => handleDelete(data.id)}>Delete</button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
                </div>
            </main>
        </div>
    );
}

export default CRUD;
