import React, { useState } from 'react';
import {
  Form, Button, Alert, Row, Col,
} from 'react-bootstrap';

//import Select from 'react-select';

import './style.css';
import { message } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import BackgroundImage from '../../assets/images/background.png';
import { useAuth } from '../../service/authService';

function Register() {
  const [inputFullName, setInputFullName] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  const [inputPassword, setInputPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    if (inputPassword !== confirmPassword) {
      setShowError(true);
      setLoading(false);
      return;
    }
    const userData = {
      full_name: inputFullName,
      email: inputEmail,
      password: inputPassword,
    };
    try {
      await register(userData).then((response) => {
        message.success('User successfully registered');
        navigate('/login');
        void response; // attempting to solve eslint error
      });
    } catch (error) {
      // Error occurred during registration
      message.error('Registration failed');
    }
    setLoading(false);
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-in__backdrop" />
      <Form className="form-div shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-4 text-center">Sign Up</div>
        {showError && (
        <Alert
          className="mb-2"
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
        >
          Passwords do not match.
        </Alert>
        )}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={inputFullName}
                placeholder="Full Name"
                onChange={(e) => setInputFullName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={inputEmail}
                placeholder="Email"
                onChange={(e) => setInputEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={inputPassword}
                placeholder="Password"
                onChange={(e) => setInputPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Sign Up
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Signing Up...
          </Button>
        )}
        {/* <div className="d-grid  mt-3">
                    <Button
                        className="text-muted px-0"
                        variant="link"
                        onClick={handlePassword}
                        style={{ textAlign: "center" }}
                    >
                        Forgot password?
                    </Button>
                </div> */}
        <div className="mt-3">
          <p className="text-center mb-0">
            Already have an account?
            {' '}
            <Link to="/login"><span>Log In</span></Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Register;
