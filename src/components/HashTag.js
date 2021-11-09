import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HashTag = ({ tag }) => {
  return <HashTagWrap>{tag}</HashTagWrap>;
};

HashTag.propTypes = {
  tag: PropTypes.string.isRequired,
};

const HashTagWrap = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 16px;
  font-weight: 400;
  color: #f5f3f8;
  width: 94px;
  height: 36px;
  background-color: #8c4dff;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 10px;
`;

export default HashTag;
