/* eslint-disable */
import React from 'react';
import { Redirect, Route } from 'react-router';
import isLogin from '../utils/isLogin';

const PrivatecRoute = ({ component: Component, ...rest }) => {
  console.log(isLogin())
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivatecRoute;
