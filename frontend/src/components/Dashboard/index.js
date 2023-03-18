// Description: Dashboard component

import React, { useState } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import "./style.css";

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() { // logout user on click
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
      <div>
        <Container>
          <Card className="dashboard-card">
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              <div>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Name:</strong> {currentUser.displayName}
                <br />
                <strong>Email:</strong> {currentUser.email}
              </div>
              <Link to="/settings" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
              <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  )
}
