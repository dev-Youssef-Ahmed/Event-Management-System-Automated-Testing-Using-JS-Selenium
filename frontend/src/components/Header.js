import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        setIsAdmin(false); // Reset admin status
        setToken(null);    // Reset token
        navigate('/login');
    };

    // Sync state with localStorage changes
    useEffect(() => {
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
        setToken(localStorage.getItem("token"));
    }, [localStorage.getItem("isAdmin"), localStorage.getItem("token")]);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Event Management
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                {isAdmin && <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>}
                {token ? (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
