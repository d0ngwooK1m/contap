import React from 'react';
import styled from 'styled-components';

const SizeCheck = () => {
  const { clientWidth } = document.documentElement;
  // window.matchmedia
  const [view, setView] = React.useState(false);

  React.useEffect(() => {
    console.log(clientWidth);
    if (clientWidth < '1024px') {
      setView(true);
    }
  }, [clientWidth]);

  if (view) {
    return (
      <Wrapper>
        <span>모바일에서 지원 안함! PC로 봐주세요</span>
      </Wrapper>
    );
  }
  return null;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

export default SizeCheck;
