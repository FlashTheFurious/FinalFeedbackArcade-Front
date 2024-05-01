import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { AuthProvider } from '../service/authService';
import GameDetails from '../Components/Games/GameDetails';
import AuthGuard from '../service/authGuard';
import NotFoundPage from '../Pages/NotFoundPage';
import SetPassword from '../Pages/Login/SetPassword';
import ValidateUser from '../Pages/Login/ValidateUser';

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<SetPassword />} />
          <Route path="/validate-user" element={<ValidateUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<AuthGuard><HomePage /></AuthGuard>} />
          <Route path="/games" element={<AuthGuard><HomePage /></AuthGuard>} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="*" element={<NotFoundPage />} /> {/* DO NOT MOVE FROM LAST PLACE */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
