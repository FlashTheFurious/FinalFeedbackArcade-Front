// authService.js

import React, { createContext, useContext } from 'react';

//import React, { createContext, useContext, useState } from 'react';
// void useState; // attempting to solve eslint error

import PropTypes from 'prop-types'; // Import prop-types

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from './api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const storedUser = Cookies.get('user');

  const login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      Cookies.set('user', JSON.stringify(response?.data));
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return error;
    }
  };

  const register = async (data) => {
    try {
      const response = await api.post('/register', data);
      console.log(response);
      if (response.status === 201) {
        // Handle successful signup
        navigate('/');
        return response;
      }
      // Handle error
      const errorData = await response.json();
      console.error('Signup failed:', errorData.error);
      return null;
    } catch (error) {
      console.error('Signup error:', error.response.data.error);
      return error;
    }
  };

  const logout = () => {
    Cookies.remove('user');
    navigate('/login');
  };
  void storedUser; // attempting to solve eslint error
  return (
    <AuthContext.Provider value={{ login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

//Solving child prop eslint error
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired // This line uses PropTypes to validate children
};
export const useAuth = () => useContext(AuthContext);
