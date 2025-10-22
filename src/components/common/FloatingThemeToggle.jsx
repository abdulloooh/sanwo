import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import './FloatingThemeToggle.scss';

const FloatingThemeToggle = () => {
  return (
    <div className="floating-theme-toggle">
      <DarkModeToggle />
    </div>
  );
};

export default FloatingThemeToggle;
