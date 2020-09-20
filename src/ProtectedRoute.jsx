import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUser } from 'reactfire';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  const user = useUser();

  let isAuthenticated = user;
  if (user === null) {
    isAuthenticated = false;
  }

  return isAuthenticated ? (
    <Route {...rest} render={(matchProps) => <Component {...matchProps} />} />
  ) : (
    <Redirect to={{ pathname: '/' }} />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default ProtectedRoute;
