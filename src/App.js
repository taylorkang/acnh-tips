import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import logo from './logo.svg';
import './App.css';

import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Tips from './pages/Tips/Tips';
import ProtectedRoute from './ProtectedRoute';

const MainNav = () => {
  return (
    <Nav defaultActiveKey='/home' as='ul'>
      <Nav.Item as='li'>
        <Nav.Link href='/home'>Active</Nav.Link>
      </Nav.Item>
      <Nav.Item as='li'>
        <Nav.Link eventKey='link-1'>Link</Nav.Link>
      </Nav.Item>
      <Nav.Item as='li'>
        <Nav.Link eventKey='link-2'>Link</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/signin'>
          <SignIn />
        </Route>
        <ProtectedRoute component={Tips} exact path='/tips' />
      </Switch>
    </Router>
  );
}

export default App;
