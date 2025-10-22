import React from 'react';
import { useLocation } from 'react-router-dom';
import FloatingThemeToggle from './FloatingThemeToggle';

const ConditionalThemeToggle = () => {
  const location = useLocation();
  
  // Show floating toggle only on auth pages (login, register, etc.)
  const authPages = ['/login', '/register', '/forgetpassword', '/password-reset'];
  const isAuthPage = authPages.includes(location.pathname);
  
  return isAuthPage ? <FloatingThemeToggle /> : null;
};

export default ConditionalThemeToggle;
