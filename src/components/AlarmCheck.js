/* eslint-disable */
import React from 'react';
import T from '../api/tokenInstance';
import { getToken } from '../utils/auth';
import { useDispatch } from 'react-redux';
import { alarmCheck } from '../features/user/actions';

const AlarmCheck = ({ children }) => {
  const dispatch = useDispatch();
  const checkToken = getToken();
  const PHONE_TUTORIAL = 1;
  const PROFILE_TUTORIAL = 2;
  const CAN_OTHER_READ = 4;
  const ALARM = 8;

  React.useEffect(async () => {
    // console.log('testToken===>', checkToken)
    if (checkToken !== null || checkToken !== undefined) {
      const { data } = await T.GET('/main/info');
      const alarmInfo = {
        phoneTutorial: data & PHONE_TUTORIAL,
        profileTutorial: data & PROFILE_TUTORIAL,
        canOtherRead: data & CAN_OTHER_READ,
        alarm: data & ALARM,
      };
      dispatch(alarmCheck(alarmInfo));
    }
  }, []);

  return children;
};

export default AlarmCheck;
