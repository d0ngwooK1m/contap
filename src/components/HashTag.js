/*eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ColorStyle, Opacity } from '../utils/systemDesign';

const HashTag = ({ tag, category }) => {
  return <HashTagWrap category={category}>{tag}</HashTagWrap>;
};

HashTag.propTypes = {
  tag: PropTypes.string,
  category: PropTypes.bool.isRequired,
};

HashTag.defaultProps = {
  tag: null
}

const HashTagWrap = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-size: 16px;
  font-weight: 400;
  color: ${ColorStyle.Gray500};
  width: fit-content;
  height: 35px;
  padding: 0px 16px;
  background-color: ${({category}) => category ? ColorStyle.PrimaryPurple+Opacity[20] : ColorStyle.PrimaryMint+Opacity[20]};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0px 6px;
`;

export default HashTag;
