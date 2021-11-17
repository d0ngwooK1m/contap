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
    console.log('로그인 되어있는지?===>', checkToken);
    if (checkToken !== undefined) {
      console.log('통과하는지 체크');
      const { data } = await T.GET('/main/info');
      console.log('alram 결과값===>', data);
      // console.log(data & PHONE_TUTORIAL, data & PROFILE_TUTORIAL, data & CAN_OTHER_READ, data & ALARM);
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
