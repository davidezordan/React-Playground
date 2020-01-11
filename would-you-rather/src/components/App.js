import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoadingBar from 'react-redux-loading-bar';
import NavAuth from './NavAuth';
import Login from './Login';

const App = () => (
  <div className="container">
    <Router>
      <>
        <LoadingBar />

        <Switch>
          <Route path="/login" component={Login} />

          <NavAuth />
        </Switch>
      </>
    </Router>
  </div>
);

export default App;
