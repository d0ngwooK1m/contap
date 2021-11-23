/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { ReactComponent as AddRound } from '../svgs/AddRound.svg';
import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';
import CardBackWrite from './CardBackWrite';
import { Grid } from '../elements';

const EmptyBox = () => {
  const cardCount = useSelector((state) => state.cards.allIds);
  const [click, setClick] = React.useState(false);
  const [display, setDisplay] = React.useState({ display: 'flex' });
  console.log(display);

  const closeClick = () => {
    setClick(false);
  };

  if (!click) {
    return (
      <Grid width="100%" height="100%" padding="0px 0px 15% 0px;">
        <TextDiv>
          <TitleText>
            나의 카드 <Count>{cardCount.length}</Count>
          </TitleText>
          <TextBtn
            onClick={() => {
              // dispatch(isSuccess(!handleClick));
              setClick(true);
            }}
          >
            + 카드 추가하기
          </TextBtn>
        </TextDiv>
        <Div
          onClick={() => {
            // dispatch(isSuccess(!handleClick));
            setClick(true);
            setDisplay({ display: 'none' });
          }}
        >
          <AddRound />
        </Div>
      </Grid>
    );
  }
  return (
    <Grid width="100%" height="100%" padding="0px 0px 7% 0px;">
      <TextDiv>
        <TitleText>
          나의 카드 <Count>{cardCount.length}</Count>
        </TitleText>
        <TextBtn
          onClick={() => {
            // dispatch(isSuccess(!handleClick));
            setClick(true);
          }}
        >
          + 카드 추가하기
        </TextBtn>
      </TextDiv>
      <Grid>
        <CardBackWrite onHide={closeClick} />
      </Grid>
    </Grid>
  );
};

export default EmptyBox;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1110px;
  height: 136px;
  border-radius: 16px;
  border: 1px solid ${'#4d4759' + Opacity[50]};
  margin: auto;
  background-color: ${ColorStyle.BackGround100};
  text-align: center;
  cursor: pointer;
`;

const TextDiv = styled.div`
  width: 1110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
`;

const TitleText = styled.p`
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  margin: 80px 0px 64px 0px;
  color: ${ColorStyle.Gray500};
  font-weight: 700;
`;

const Count = styled.span`
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  // margin: 160px 0px 64px 0px;
  color: ${ColorStyle.PrimaryPurple};
  font-weight: 700;
`;

const TextBtn = styled.div`
  width: 15%;
  font-size: ${FontScale.Body1_20};
  font-family: ${FontFamily};
  color: ${ColorStyle.Gray500};
  cursor: pointer;
  margin: 80px 0px 61px 0px;
  font-weight: 700;
  text-align: end;
  z-index: 3;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;
