import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';

// import { Grid } from '../elements';

const TagList = ({ tag }) => {
  console.log('태그확인===>', tag);
  return (
    <HobbyDiv>
      <HashTagWrap>{tag}</HashTagWrap>
    </HobbyDiv>
  );
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
  background-color: ${ColorStyle.BackGround300 + Opacity[10]};
  border: 1px solid ${ColorStyle.Gray500 + Opacity[15]};
  border-radius: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-right: 16px;
`;

const HobbyDiv = styled.div`
  // margin-left: 32px;
`;
