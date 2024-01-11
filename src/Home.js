// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // You can create a CSS file for styling

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Donny's Game Room!</h1>
      <p>Choose a game to play:</p>
      <ul>
        <li><Link to="/tic-tac-toe">Tic Tac Toe</Link></li>
        <li><Link to="/checkers">Checkers</Link></li>
        <li><Link to="/sudoku">Sudoku</Link></li>
      </ul>
    </div>
  );
};

export default Home;
