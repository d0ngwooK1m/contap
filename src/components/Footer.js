import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';
import { ReactComponent as InstagramSvg } from '../svgs/Instagram.svg';

const Footer = () => {
  const location = useLocation();

  return (
    <FooterWrapper location={location.pathname}>
      <div>
        <Text color={ColorStyle.Gray300} regular16>
          ©Contap
        </Text>
      </div>
      <RightWrapper
        onClick={() => {
          window.open(
            'https://www.instagram.com/contap_official/?utm_medium=copy_link',
          );
        }}
      >
        <StyledInstagramSvg />
        <Text color={ColorStyle.PrimaryPurple} regular16>
          contap_official
        </Text>
      </RightWrapper>
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

const RightWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const StyledInstagramSvg = styled(InstagramSvg)`
  margin-right: 15px;
`;

export default Footer;
