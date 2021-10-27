import React from 'react';
import { Grid } from '../elements';
import TabMenu from '../components/TabMenu';
import PwSettingForm from '../components/PwSettingForm';
import WithdrawalForm from '../components/WithdrawalForm';

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
  return (
    <Grid>
      <p>설정 페이지</p>
      <TabMenu content={content} />
    </Grid>
  );
};

export default Settings;
