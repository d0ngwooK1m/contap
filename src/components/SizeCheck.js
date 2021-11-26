import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
// import { debounce } from 'lodash';
import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';
import { ReactComponent as ResizeSvg } from '../svgs/Resize.svg';
import { ReactComponent as LogoSvg } from '../svgs/Logo.svg';

const SizeCheck = ({ children }) => {
  // const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);

  // const handleResize = () => {
  //   console.log(
  //     `브라우저 화면 사이즈 x: ${window.innerWidth}, y: ${window.innerHeight}`,
  //   );
  //   setInnerWidth(window.innerWidth);
  // };

  // React.useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  if (window.matchMedia('(max-width: 1440px)').matches) {
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
  }
  return children;
};

SizeCheck.propTypes = {
  children: PropTypes.any.isRequired,
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;
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

export default SizeCheck;
