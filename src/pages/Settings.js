import React from 'react';
import { Grid, Text } from '../elements';
import TabMenu from '../components/TabMenu';
import PwSettingForm from '../components/PwSettingForm';
import WithdrawalForm from '../components/WithdrawalForm';
// import Bell from '../svgs/Bell';
import { ReactComponent as LockIconSvg } from '../svgs/Lock.svg';
import { ReactComponent as WithdrawalIconSvg } from '../svgs/Withdrawal.svg';

const content = [
  // {
  //   id: 'GrabList',
  //   clickTab: (
  //     <div
  //       style={{
  //         margin: 'auto',
  //         display: 'flex',
  //         position: 'relative',
  //         left: '14.25px',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <div>
  //         <GrabListIconSvg fill="#50FFB8" />
  //       </div>
  //       <div style={{ position: 'relative', left: '16px' }}>
  //         <Text color="#50FFB8" regular20>
  //           나의 그랩
  //         </Text>
  //       </div>
  //     </div>
  //   ),
  //   noneClickTab: (
  //     <div
  //       style={{
  //         margin: 'auto',
  //         display: 'flex',
  //         position: 'relative',
  //         left: '14.25px',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <div>
  //         <GrabListIconSvg fill="#A09BAC" />
  //       </div>
  //       <div style={{ position: 'relative', left: '16px' }}>
  //         <Text color="#a09bac" regular20>
  //           나의 그랩
  //         </Text>
  //       </div>
  //     </div>
  //   ),
  //   content: <GrabList select="GrabList" />,
  // },
  {
    id: 'PwSettingForm',
    clickTab: (
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          position: 'relative',
          left: '14.25px',
          alignItems: 'center',
        }}
      >
        <div>
          <LockIconSvg stroke="#50FFB8" />
        </div>
        <div style={{ position: 'relative', left: '16px' }}>
          <Text color="#50FFB8" regular20>
            받은 탭
          </Text>
        </div>
      </div>
    ),
    noneClickTab: (
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          position: 'relative',
          left: '14.25px',
          alignItems: 'center',
        }}
      >
        <div>
          <LockIconSvg stroke="#A09BAC" />
        </div>
        <div style={{ position: 'relative', left: '16px' }}>
          <Text color="#a09bac" regular20>
            받은 탭
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
          position: 'relative',
          left: '14.25px',
          alignItems: 'center',
        }}
      >
        <div>
          <WithdrawalIconSvg fill="#50FFB8" />
        </div>
        <div style={{ position: 'relative', left: '16px' }}>
          <Text color="#50FFB8" regular20>
            보낸 탭
          </Text>
        </div>
      </div>
    ),
    noneClickTab: (
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          position: 'relative',
          left: '14.25px',
          alignItems: 'center',
        }}
      >
        <div>
          <WithdrawalIconSvg fill="#A09BAC" />
        </div>
        <div style={{ position: 'relative', left: '16px' }}>
          <Text color="#a09bac" regular20>
            보낸 탭
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
