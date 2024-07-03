import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Correct import of Login component
import Logout from './pages/Logout';
import Register from './pages/Register';
import Admin from './pages/Admin';
import User from './pages/User';
import Landing from './pages/Landing'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserProvider } from './UserContext';
import Blog from './pages/BlogView'

const App = () => {
    const [user, setUser] = useState({
        id: null,
        isAdmin: null
    });

    const unsetUser = () => {
        localStorage.clear();
        setUser({ id: null, isAdmin: null });
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser({ id: data._id, isAdmin: data.isAdmin });
                    } else {
                        setUser({ id: null, isAdmin: null });
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    setUser({ id: null, isAdmin: null });
                }
            } else {
                setUser({ id: null, isAdmin: null });
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* Uncomment and adjust paths as needed */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" element={<Landing />} />
                    <Route path="/blogview" element={<Blog />} />

                    {/* <Route path="/" element={<Landing />} /> */}
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
