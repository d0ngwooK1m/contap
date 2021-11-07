import React from 'react';
import { Grid } from '../elements';
import TabMenu from '../components/TabMenu';
import PwSettingForm from '../components/PwSettingForm';
import WithdrawalForm from '../components/WithdrawalForm';
import useSocketNotiRoom from '../hooks/useSocketNotiRoom';

const content = [
  {
    id: 'PwSettingForm',
    tab: '비밀번호 변경',
    content: <PwSettingForm />,
  },
  {
    id: 'WithdrawalForm',
    tab: '회원 탈퇴',
    content: <WithdrawalForm />,
  },
];

const Settings = () => {
  const [wsConnectSubscribe, wsDisConnectUnsubscribe, token] =
    useSocketNotiRoom();

  React.useEffect(() => {
    if (!token) {
      return null;
    }
    wsConnectSubscribe();

    return () => {
      wsDisConnectUnsubscribe();
    };
  }, []);
  return (
    <Grid>
      <p>설정 페이지</p>
      <TabMenu content={content} />
    </Grid>
  );
};

export default Settings;
