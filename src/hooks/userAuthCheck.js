/* eslint-disable consistent-return */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, removeToken } from '../utils/auth';
import { authorize } from '../features/user/actions';
import tokenAxios from '../api/tokenInstance';

const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const userAuthCheck = () => {
  const isUserAuthorized = useSelector((state) => state.user.isAuthorized);

  const dispatch = useDispatch();
  const token = getToken();

  React.useEffect(() => {
    if (!token || isUserAuthorized) {
      return null;
    }

    async function test() {
      try {
        const { data } = await tokenAxios.GET('/auth');
        if (data.result === 'fail') {
          removeToken(TOKEN_KEY);
          return null;
        }

        const { userName, email } = data;

        dispatch(authorize(email, userName));
      } catch (error) {
        console.log(error);
        console.log(error.message);
      }
      return null;
    }

    test();
  }, []);

  return [isUserAuthorized, token];
};

export default userAuthCheck;
