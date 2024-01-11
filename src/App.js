// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TicTacToe from './TicTacToe';
import Checkers from './Checkers';
import Sudoku from './Sudoku';
import Home from './Home';
import Navigation from './Navigation';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />

        <Switch>
          <Route path="/tic-tac-toe" component={TicTacToe} />
          <Route path="/checkers" component={Checkers} />
          <Route path="/sudoku" component={Sudoku} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
