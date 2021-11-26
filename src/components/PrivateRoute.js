/* eslint-disable */
import React from 'react';
import { Redirect, Route } from 'react-router';
import isLogin from '../utils/isLogin';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
