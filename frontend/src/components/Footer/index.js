// Description: Footer component

import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from "react-bootstrap";
import "./style.css";

export default function Footer() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [, setError] = useState('');

  async function handleLogout() { 
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <> 
      <div className="fixed-bottom text-center pb-5">
        <Container>
          <div>
            <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/settings">Settings</Link> | {currentUser ? <Link onClick={handleLogout}>Logout</Link> : <Link to="/login">Login</Link>}
          </div>
          <div className="fst-italic">
            Copyright &copy; 2023 by <a href="https://sethkerrey.com/">Seth Kerrey</a>
          </div>
        </Container>
      </div>
    </>
  );
}