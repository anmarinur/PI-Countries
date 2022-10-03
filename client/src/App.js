import React from 'react'
import { Home } from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import AddActivity from './components/AddActivity/AddActivity';
import style from './App.module.css';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className={style.app}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home/:id" component={Detail} />
          <Route path="/home" component={Home} />
          <Route path="/activities" component={AddActivity} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
