import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HashTag = ({ tag }) => {
  return <HashTagWrap># {tag}</HashTagWrap>;
};

HashTag.propTypes = {
  tag: PropTypes.string.isRequired,
};

const HashTagWrap = styled.div`
  width: 94px;
  height: 36px;
  background-color: #dfe0f7;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 10px;
  font-weight: bold;
  color: #7f7c82;
`;

export default HashTag;
