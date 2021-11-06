import React from 'react';
// import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { PropTypes } from 'prop-types';
import userAuthCheck from '../hooks/userAuthCheck';

const Permit = ({ children }) => {
  const [isUserAuthorized, token] = userAuthCheck();

  if (!(token || isUserAuthorized)) {
    return <Redirect to="/signup" />;
  }

  return children;
};

Permit.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Permit;
