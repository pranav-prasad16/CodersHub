import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use useContext to access ThemeContext

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Dark' : 'Light'} mode
    </button>
  );
};

export default ThemeToggleButton;
