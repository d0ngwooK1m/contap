import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';

const TagList = ({ tag }) => {
  return <HashTagWrap>{tag}</HashTagWrap>;
};

TagList.propTypes = {
  tag: PropTypes.string,
};

TagList.defaultProps = {
  tag: null,
};

export default TagList;

const HashTagWrap = styled.div`
  width: 146px;
  height: 54px;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  background-color: ${ColorStyle.BackGround300 + Opacity[15]};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0px 8px;
`;
