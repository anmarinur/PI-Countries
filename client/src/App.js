import React from 'react'
import { Home } from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import style from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={style.app}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
