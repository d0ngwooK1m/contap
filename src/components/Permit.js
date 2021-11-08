import React from 'react';
// import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { PropTypes } from 'prop-types';
import useUserAuthCheck from '../hooks/useUserAuthCheck';

const Permit = ({ children }) => {
  const [isUserAuthorized, token] = useUserAuthCheck();

  if (!(token || isUserAuthorized)) {
    return <Redirect to="/login" />;
  }

  return children;
};

Permit.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Permit;
