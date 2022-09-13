import React from 'react'
import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
     <Route path="/" component = {Landing} />
    </div>
  );
}

export default App;
