/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

const Button = ({
  children,
  height,
  short,
  _onClick,
  is_float,
  crud,
  padding,
  width,
  margin,
}) => {

  const styles = {
    height,
    padding,
    width,
    margin,
  };
  if (short) {
    return (
      <>
        <ShortBtn onClick={_onClick} {...styles}>
          {children}
        </ShortBtn>
      </>
    );
  }

  if (is_float) {
    return (
      <>
        <FloatBtn onClick={_onClick} {...styles}>
          {children}
        </FloatBtn>
      </>
    );
  }

  if (crud) {
    return (
      <>
        <MyBtn onClick={_onClick} {...styles}>
          {children}
        </MyBtn>
      </>
    );
  }

  return (
    <>
      <Btn onClick={_onClick} {...styles}>
        {children}
      </Btn>
    </>
  );
};

Button.defaultProps = {
  children: null,
  height: '50px',
  crud: false,
  is_me: false,
  padding: '12px 0px',
  width: '100%',
  margin: '10px',
};

const ShortBtn = styled.button`
  width: 25%;
  background-color: #c4c4c4;
  color: #222831;
  border: 0px;
  margin: 8px;
  padding: 0px;
  cursor: pointer;

  height: ${(props) => props.height};
`;

const Btn = styled.button`
  width: 100%;
  background-color: #222831;
  color: #fff;
  border: 0px;
  margin-top: 28px;
  cursor: pointer;

  height: ${(props) => props.height};
`;

const MyBtn = styled.button`
  width: ${(props) => props.width};
  border: 0px;
  margin: ${(props) => props.margin};
  background-color: #222831;
  color: #fff;
  height: ${(props) => props.height};
  border-radius: 4px;
  cursor: pointer;
`;

const FloatBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #fff;
  border: none;
  border-radius: 25px;
  box-sizing: border-box;
  padding: 0px;
  font-size: 30px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  cursor: pointer;
`;

export default Button;
