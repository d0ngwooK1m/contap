/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabButton = ({ val, id, check, click }) => {
  console.log(val)
  return (
      <Button
        style={
          check === id
            ? { backgroundColor: '#141422' }
            : { backgroundColor: '#0f0a1a' }
        }
        type="button"
        onClick={click}
      >
      {check === id ? val.clickTab : val.noneClickTab}
      </Button>
  );
};

TabButton.propTypes = {
  val: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  check: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};


const Button = styled.button`

  position: relative;
  height: 45px;
  width: 179px;
  left: 0px;
  top: 63px;
  border-radius: 50px;
  border: 0px;
  margin: 8px 0px;
  padding: 8px, 12px, 8px, 12px;

  /* p {
    color: #a09bac;
    position: static;
    height: 29px;
    left: 50px;
    top: 8px;

    font-family: 'Pretendard';
    font-style: normal;
    font-size: 20px;
    font-weight: 400;
    line-height: 29px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 16px;
  } */
`;

export default TabButton;
