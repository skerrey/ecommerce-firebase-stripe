// Description: Update Profile component

import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail, updateInfo } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) { // signup user on submit
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) { // check if passwords match
      return setError('Passwords do not match')
    }

    const name = firstNameRef.current.value + " " + lastNameRef.current.value;

    // Capitalize first letter of first and last name upon signup
    const capitalize = (name) => {
      return name
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    const promises = []; // Update email and password
    setLoading(true);
    setError('');

    if (name !== currentUser.displayName) {
      promises.push(updateInfo(capitalize(name)))
    }

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => { // navigate home after update
      navigate('/');
    }).catch(() => {
      setError('Failed to update account');
    }).finally(() => {
        setLoading(false);
    })
  }

  // Split up current user's name into first and last name
  var nameArr = currentUser.displayName.split(/\s+/);

  return (
    <>
      <div className="parent-container">
        <div className="child-container">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="first-name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" ref={firstNameRef} required defaultValue={nameArr[0]} />
                </Form.Group>
                <Form.Group id="last-name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" ref={lastNameRef} required defaultValue={nameArr[1]} />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                </Form.Group>
                <Form.Group id="password" className="my-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same' />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same' />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Update
                </Button>
                <div className="w-100 text-center mt-3">
                  <Link to="/">Cancel</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}
