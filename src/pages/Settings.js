import React from 'react';
import { Grid, Text } from '../elements';
import TabMenu from '../components/TabMenu';
import PwSettingForm from '../components/PwSettingForm';
import WithdrawalForm from '../components/WithdrawalForm';
import AlarmForm from '../components/AlarmForm';
import { ReactComponent as LockIconSvg } from '../svgs/Lock.svg';
import { ReactComponent as WithdrawalIconSvg } from '../svgs/Withdrawal.svg';
import { ReactComponent as BellIconSvg } from '../svgs/Bell.svg';

const content = [
  {
    id: 'AlarmForm',
    clickTab: (
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div>
          <BellIconSvg stroke="#50FFB8" />
        </div>
        <div>
          <Text color="#50FFB8" regular20>
            알림 설정
          </Text>
        </div>
      </div>
    ),
    noneClickTab: (
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div>
          <BellIconSvg fill="#A09BAC" />
        </div>
        <div>
          <Text color="#a09bac" regular20>
            알림 설정
          </Text>
        </div>
      </div>
    ),
    content: <AlarmForm select="AlarmForm" />,
  },
  {
    id: 'PwSettingForm',
    clickTab: (
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div>
          <LockIconSvg stroke="#50FFB8" />
        </div>
        <div>
          <Text color="#50FFB8" regular20>
            비밀번호 변경
          </Text>
        </div>
      </div>
    ),
    noneClickTab: (
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div>
          <LockIconSvg stroke="#A09BAC" />
        </div>
        <div>
          <Text color="#a09bac" regular20>
            비밀번호 변경
          </Text>
        </div>
      </div>
    ),
    content: <PwSettingForm select="PwSettingForm" />,
  },
  {
    id: 'WithdrawalForm',
    clickTab: (
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div>
          <WithdrawalIconSvg fill="#50FFB8" />
        </div>
        <div>
          <Text color="#50FFB8" regular20>
            회원 탈퇴
          </Text>
        </div>
      </div>
    ),
    noneClickTab: (
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div>
          <WithdrawalIconSvg fill="#A09BAC" />
        </div>
        <div>
          <Text color="#a09bac" regular20>
            회원 탈퇴
          </Text>
        </div>
      </div>
    ),
    content: <WithdrawalForm select="SendTap" />,
  },
];

const Settings = () => {
  return (
    <Grid>
      <TabMenu content={content} />
    </Grid>
  );
};

export default Settings;
