import Home from './Route/Home';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Route/Login';
import Logout from './Route/Logout';
import Signup from './Route/Signup';
import Header from './Route/Header';
import SinglePost from './Body/SinglePost';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
library.add(faArrowUp, faArrowDown);
const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/logout' component={Logout}></Route>
          <Route path='/signup' component={Signup}></Route>
          <Route path='/post/:id' children={<SinglePost />}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
