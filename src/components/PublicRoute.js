/* eslint-disable */
import React from 'react';
import { Redirect, Route } from 'react-router';
import isLogin from '../utils/isLogin';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
