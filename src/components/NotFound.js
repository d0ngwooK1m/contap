import React from 'react';
// import styled from 'styled-components';
// import { debounce } from 'lodash';
// import { useHistory, useLocation } from 'react-router';
// import { ColorStyle } from '../utils/systemDesign';
import { Text } from '../elements';
// import { ReactComponent as ResizeSvg } from '../svgs/Resize.svg';
// import { ReactComponent as LogoSvg } from '../svgs/Logo.svg';

const NotFound = () => {
  // const history = useHistory();
  // const location = useLocation();
  // console.log('위치 확인중===>', location);

  return (
    <div>
      <div>
        {/* <LogoSvg /> */}
        <Text color="black" bold20>
          올바르지 않은 주소입니다
          <br />
          돌아가기
        </Text>
        {/* <ResizeSvg /> */}
      </div>
    </div>
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

export default NotFound;
