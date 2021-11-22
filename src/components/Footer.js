import React from 'react';
import styled from 'styled-components';
import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';

const Footer = () => {
  return (
    <FooterWrapper>
      <Text color={ColorStyle.Gray300} regular16>
        Contap
      </Text>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  top: 0px;
  width: 1440px;
  height: 88px;
  background-color: ${ColorStyle.BackGround300};
`;

export default Footer;
