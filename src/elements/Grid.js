/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const {
    is_flex,
    width,
    padding,
    margin,
    bg,
    children,
    center,
    maxheight,
    _onClick,
  } = props;

  const styles = {
    is_flex,
    width,
    margin,
    padding,
    bg,
    center,
    maxheight,
  };

  return (
    <>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: '100%',
  padding: false,
  margin: false,
  bg: false,
  center: false,
  maxheight: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  /* max-width: 600px; */
  ${(props) => (props.padding ? `padding : ${props.padding};` : '')}
  ${(props) => (props.margin ? `margin : ${props.margin};` : '')}
  ${(props) => (props.bg ? `background-color : ${props.bg};` : '')}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ''};
  ${(props) => (props.center ? 'text-align : center;' : '')}
  ${(props) => (props.maxheight ? `max-height : ${props.maxheight};` : '')}
`;

export default Grid;
