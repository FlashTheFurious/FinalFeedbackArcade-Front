import React, { useState } from 'react';

// import { Form, Button, Alert } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';


import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import BackgroundImage from '../../assets/images/background.png';
import { validateUser } from '../../service/api';

function ValidateUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  /*
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email,
      };

      const response = await validateUser(userData);
      console.log(response);

      if (response.status === 200) {
        message.success('User verified');
        navigate('/change-password', { state: { userEmail: email } });
      } else {
        message.error('User not found');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Update state to show error message
      message.error(error.response.data.error);
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

        <div className="h4 mb-2 text-center">Enter your email</div>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter your email to continue"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button className="w-100" variant="primary" type="submit">
          Continue
        </Button>

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

export default ValidateUser;
