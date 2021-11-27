import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ResizeSvg } from '../svgs/Resize.svg';
import { ReactComponent as LogoSvg } from '../svgs/Logo.svg';
import { Text } from '../elements';
import { ColorStyle } from '../utils/systemDesign';

const MobileBlock = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <LogoSvg />
        <Text color="white" bold20>
          모바일을 지원하지 않습니다
          <br />
          PC에서 Contap을 접속해 보세요
        </Text>
        <ResizeSvg />
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: white;
  background-color: ${ColorStyle.BackGround};
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 360px;
  height: 564px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default MobileBlock;
