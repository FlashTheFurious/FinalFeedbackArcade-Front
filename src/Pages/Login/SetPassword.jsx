import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import BackgroundImage from '../../assets/images/background.png';
import { updatePassword } from '../../service/api';

function SetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  //   const [loading, setLoading] = useState(false);
  const [loading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.userEmail;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation logic
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShow(true);
      return;
    }
    const updatedData = {
      email: userEmail,
      password,
    };
    const response = await updatePassword(updatedData);
    if (response.status === 200) {
      message.success('Password successfully changed');
      navigate('/login');
    }
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop" />
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>

        <div className="h4 mb-2 text-center">Set New Password</div>
        {/* Error Alert */}
        {show && (
        <Alert
          className="mb-2"
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          {error}
        </Alert>
        )}
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm New Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Set Password
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Setting Password...
          </Button>
        )}
      </Form>
      {/* Footer */}
      <div className="mt-3">
        <p style={{ textAlign: 'center' }} className="mt-1">
          New user?
          <Link to="/register"><span> Create account</span></Link>
        </p>
      </div>
    </div>
  );
}

export default SetPassword;
