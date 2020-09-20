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
      </Switch>
    </Router>
  );
}

export default App;
