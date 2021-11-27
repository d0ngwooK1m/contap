import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';

const Footer = () => {
  const location = useLocation();

  return (
    <FooterWrapper location={location.pathname}>
      <Text color={ColorStyle.Gray300} regular16>
        Contap
      </Text>
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

export default Footer;
