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
  ${({ location }) => (location === '/' ? 'height: 80px;' : 'height: 41px;')};
  ${({ location }) =>
    location === '/' ? 'position:absolute' : 'position:fixed'};
  bottom: 0px;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 164px;
  ${({ location }) =>
    location === '/' ||
    location === '/card/:userId' ||
    location === '/settings' ||
    location === '/mypage' ||
    location === '/edit' ||
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
