import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';

const Footer = () => {
  const location = useLocation();

  return (
    <FooterWrapper location={location.pathname}>
      <div>
        <Text color={ColorStyle.Gray300} regular16>
          © 2021. Contap all rights reserved.
        </Text>
      </div>
      <div style={{ display: 'flex' }}>
        <RedirectInsta
          onClick={() => {
            window.open(
              'https://www.instagram.com/contap_official/?utm_medium=copy_link',
            );
          }}
        >
          <Text color={ColorStyle.Gray500} regular16>
            인스타그램
          </Text>
        </RedirectInsta>
        <Text regular16>&nbsp; | &nbsp; </Text>
        <RedirectNotion
          onClick={() => {
            window.open(
              'https://frequent-packet-5ba.notion.site/Contap-dda2c10905b7488fa31e7b0e5f3ee8e6',
            );
          }}
        >
          <Text color={ColorStyle.Gray500} regular16>
            멤버정보
          </Text>
        </RedirectNotion>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  ${({ location }) =>
    location === '/' ||
    location.includes('/card/') ||
    location.includes('/mypage')
      ? 'height: 80px;'
      : 'height: 41px;'};
  ${({ location }) =>
    location === '/' ||
    location.includes('/card/') ||
    location.includes('/mypage')
      ? 'position:absolute'
      : 'position:fixed'};
  bottom: 0px;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 164px;
  ${({ location }) =>
    location === '/' ||
    location.includes('/card/') ||
    location === '/settings' ||
    location === '/contap' ||
    location.includes('/mypage') ||
    location === '/grabtalk'
      ? 'display:flex;'
      : 'display:none;'}
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  background-color: #0f0a1aff;
  z-index: 1001;
  margin: 180px auto 0px auto;
  background-color: ${ColorStyle.BackGround300};
`;

const RedirectInsta = styled.div`
  cursor: pointer;
`;

const RedirectNotion = styled.div`
  cursor: pointer;
`;

export default Footer;
