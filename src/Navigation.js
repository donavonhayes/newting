// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <Link to="/">Home</Link> {/* Add the home page link */}
      <Link to="/tic-tac-toe">Tic Tac Toe</Link>
      <Link to="/checkers">Checkers</Link>
      <Link to="/sudoku">Sudoku</Link>
    </div>
  );
};

export default Navigation;
