import React from 'react'
import './App.css';
<<<<<<< HEAD
import { Route } from 'react-router-dom';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
     <Route path="/" component = {Landing} />
    </div>
=======
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Henry Countries</h1>
      </div>
    </Router>
>>>>>>> d052559903c76ca708ca399d1aa3093c7361e564
  );
}

export default App;
