import React from 'react'
import './App.css';
import { Home } from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Countries PI</h1>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
