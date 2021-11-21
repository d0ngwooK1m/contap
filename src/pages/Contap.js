import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import TabMenu from '../components/TabMenu';
import SendTap from '../components/SendTap';
import ReceiveTap from '../components/ReceiveTap';
import GrabList from '../components/GrabList';
import { ReactComponent as GrabListIconSvg } from '../svgs/GrabListIcon.svg';
import { Text } from '../elements';
import { ReactComponent as ReceiveTapIconSvg } from '../svgs/ReceiveTapIcon.svg';
import { ReactComponent as SendTapIconSvg } from '../svgs/SendTapIcon.svg';
import { ColorStyle } from '../utils/systemDesign';

const Contap = () => {
  const isReceiveTap = useSelector((state) => state.notice.isTapReceiveNoti);
  const isAcceptTap = useSelector((state) => state.notice.isTapAcceptNoti);
  console.log(isReceiveTap);
  console.log(isAcceptTap);
  const content = [
    {
      id: 'ReceiveTap',
      clickTab: (
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>
            <ReceiveTapIconSvg fill={ColorStyle.PrimaryMint} />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <Text color={ColorStyle.PrimaryMint} regular20>
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
            alignItems: 'center',
          }}
        >
          <div>
            <ReceiveTapIconSvg fill={ColorStyle.Gray300} />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text color={ColorStyle.Gray300} regular20>
                받은 탭
              </Text>
              {isReceiveTap && (
                <div
                  style={{
                    position: 'relative',
                    left: '16px',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'red',
                    borderRadius: '10px',
                  }}
                />
              )}
            </div>
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
            alignItems: 'center',
          }}
        >
          <div>
            <SendTapIconSvg fill={ColorStyle.PrimaryMint} />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <Text color={ColorStyle.PrimaryMint} regular20>
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
            alignItems: 'center',
          }}
        >
          <div>
            <SendTapIconSvg fill={ColorStyle.Gray300} />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <Text color={ColorStyle.Gray300} regular20>
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
            alignItems: 'center',
          }}
        >
          <div>
            <GrabListIconSvg fill={ColorStyle.PrimaryMint} />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <Text color={ColorStyle.PrimaryMint} regular20>
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
            alignItems: 'center',
          }}
        >
          <div>
            <GrabListIconSvg fill={ColorStyle.Gray300} />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text color="#a09bac" regular20>
                나의 그랩
              </Text>
              {isAcceptTap && (
                <div
                  style={{
                    position: 'relative',
                    left: '16px',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'red',
                    borderRadius: '10px',
                  }}
                />
              )}
            </div>
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
  min-height: 100%;
  background-color: #0f0a1a;
`;

export default Contap;
