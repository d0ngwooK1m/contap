import React from 'react';
import styled from 'styled-components';
import TabMenu from '../components/TabMenu';
import SendTap from '../components/SendTap';
import ReceiveTap from '../components/ReceiveTap';
import GrabList from '../components/GrabList';
import { ReactComponent as GrabListIconSvg } from '../svgs/GrabListIcon.svg';
import { Text } from '../elements';
import { ReactComponent as RecieveTapIconSvg } from '../svgs/RecieveTapIcon.svg';
import { ReactComponent as SendTapIconSvg } from '../svgs/SendTapIcon.svg';

const Contap = () => {
  const content = [
    {
      id: 'ReceiveTap',
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
            <RecieveTapIconSvg fill="#50FFB8" />
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
            <RecieveTapIconSvg fill="#A09BAC" />
          </div>
          <div style={{ position: 'relative', left: '16px' }}>
            <Text color="#a09bac" regular20>
              받은 탭
            </Text>
          </div>
        </div>
      ),
      content: <ReceiveTap select="ReceiveTap" />,
    },
    {
      id: 'SendTap',
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
            <SendTapIconSvg fill="#50FFB8" />
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
            <SendTapIconSvg fill="#A09BAC" />
          </div>
          <div style={{ position: 'relative', left: '16px' }}>
            <Text color="#a09bac" regular20>
              보낸 탭
            </Text>
          </div>
        </div>
      ),
      content: <SendTap select="SendTap" />,
    },
    {
      id: 'GrabList',
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
            <GrabListIconSvg fill="#50FFB8" />
          </div>
          <div style={{ position: 'relative', left: '16px' }}>
            <Text color="#50FFB8" regular20>
              나의 그랩
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
            <GrabListIconSvg fill="#A09BAC" />
          </div>
          <div style={{ position: 'relative', left: '16px' }}>
            <Text color="#a09bac" regular20>
              나의 그랩
            </Text>
          </div>
        </div>
      ),
      content: <GrabList select="GrabList" />,
    },
  ];

  return (
    <Wrap>
      <TabMenu content={content} />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0f0a1a;
`;

export default Contap;
