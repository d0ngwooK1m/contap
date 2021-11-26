import React from 'react';
import styled from 'styled-components';
// import { debounce } from 'lodash';
import { useHistory, useLocation } from 'react-router';
import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';
// import { ReactComponent as ResizeSvg } from '../svgs/Resize.svg';
// import { ReactComponent as LogoSvg } from '../svgs/Logo.svg';

const NotFound = () => {
  const history = useHistory();
  const location = useLocation();
  console.log('위치 확인중===>', location);

  return (
    <Wrapper location={location}>
      <ContentWrapper
        onClick={() => {
          history.push('/');
        }}
      >
        {/* <LogoSvg /> */}
        <Text color="white" bold20>
          올바르지 않은 주소입니다
          <br />
          돌아가기
        </Text>
        {/* <ResizeSvg /> */}
      </ContentWrapper>
    </Wrapper>
    // <div>
    //   <span
    //     style={{
    //       color: 'blue',
    //     }}
    //   >
    //     에러페이지
    //   </span>
    // </div>
  );
};

const Wrapper = styled.div`
  /* top: 0; */
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;
  background-color: ${ColorStyle.BackGround};
  /* display: flex; */
  align-items: flex-end;
  justify-content: center;
  ${({ location }) =>
    // location === '/' ||
    location === '/card/:userId' ||
    location === '/settings' ||
    location === '/mypage' ||
    location === '/edit' ||
    location === '/grabtalk'
      ? 'display:none;'
      : 'display:flex;'}
`;

const ContentWrapper = styled.div`
  width: 360px;
  height: 564px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export default NotFound;
