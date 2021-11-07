import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
/* eslint-disable */
const Text = ({
  regular14,
  regular16,
  regular20,
  bold20,
  bold24,
  bold32,
  color,
  children,
}) => {
  const styles = {
    color,
  };
  if (regular14) {
    return <Regular14 {...styles}>{children}</Regular14>;
  }
  if (regular16) {
    return <Regular16 {...styles}>{children}</Regular16>;
  }
  if (regular20) {
    return <Regular20 {...styles}>{children}</Regular20>;
  }
  if (bold20) {
    return <Bold20 {...styles}>{children}</Bold20>;
  }
  if (bold24) {
    return <Bold24 {...styles}>{children}</Bold24>;
  }
  if (bold32) {
    return <Bold32 {...styles}>{children}</Bold32>;
  }
  return null;
};

Text.propTypes = {
  children: PropTypes.string.isRequired,
  regular14: PropTypes.bool,
  regular16: PropTypes.bool,
  regular20: PropTypes.bool,
  bold20: PropTypes.bool,
  bold24: PropTypes.bool,
  bold32: PropTypes.bool,
  color: PropTypes.string,
};

Text.defaultProps = {
  regular14: false,
  regular16: false,
  regular20: false,
  bold20: false,
  bold24: false,
  bold32: false,
  color: '#000',
};

const Regular14 = styled.p`
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 14pt;
  font-weight: 400;
  color: ${({color}) => color};
`;
const Regular16 = styled.p`
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 16pt;
  font-weight: 400;
  color: ${({color}) => color};
`;
const Regular20 = styled.p`
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 20pt;
  font-weight: 400;
  color: ${({color}) => color};
`;
const Bold20 = styled.p`
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 20pt;
  font-weight: 700;
  color: ${({color}) => color};
`;
const Bold24 = styled.p`
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 24pt;
  font-weight: 700;
  color: ${({color}) => color};
`;
const Bold32 = styled.p`
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 32pt;
  font-weight: 700;
  color: ${({color}) => color};
`;

export default Text;
