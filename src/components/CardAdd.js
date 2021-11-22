/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
// import { isSuccess } from '../features/cards/actions';

import CardPortfolio from './CardPortfolio';
import CardBackWrite from './CardBackWrite';

import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';
import { Grid } from '../elements';

const CardAdd = () => {
  const dispatch = useDispatch();
  const cardCount = useSelector((state) => state.cards.allIds);
  // const cardListCheck = useSelector((state) => state.cards.allIds);
  const cardList = useSelector((state) => state.cards);
  console.log(cardList);

  const [click, setClick] = React.useState(false);

  const closeClick = () => {
    setClick(false);
  };

  // const handleClick = useSelector((state) => state.cards.isSuccess);

  // if (cardListCheck.length === 0) {
  //   return (
  //     <Grid>
  //       <EmptyBox />
  //     </Grid>
  //   );
  // }
  // {
  if (!click) {
    return (
      <Grid width="100%" height="100%" padding="0px 0px 7% 0px;">
        <div style={{ marginBottom: '92px' }}>
          <TextDiv>
            <TitleText>
              나의 프로젝트 <Count>{cardCount.length}</Count>
            </TitleText>
            <TextBtn
              onClick={() => {
                // dispatch(isSuccess(!handleClick));
                setClick(true);
              }}
            >
              + 프로젝트 추가하기
            </TextBtn>
          </TextDiv>
        </div>
        {cardList.allIds.map((cardId) => {
          return (
            <Grid>
              <CardPortfolio key={cardId} cardId={cardId} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  return (
    <Grid width="100%" height="100%" padding="0px 0px 7% 0px;">
      <TextDiv>
        <TitleText>
          나의 프로젝트 <Count>{cardCount.length}</Count>
        </TitleText>
        <TextBtn
          onClick={() => {
            // dispatch(isSuccess(!handleClick));
            setClick(true);
          }}
        >
          + 프로젝트 추가하기
        </TextBtn>
      </TextDiv>
      <Grid margin="0px 0px 48px 0px">
        <CardBackWrite onHide={closeClick} />
      </Grid>
      {cardList.allIds.map((cardId) => {
        return (
          <Grid>
            <CardPortfolio key={cardId} cardId={cardId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CardAdd;

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
  margin: 80px 0px 48px 0px;
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
  margin: 80px 0px 48px 0px;
  font-weight: 700;
  z-index: 3;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;

// const Div = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 1110px;
//   height: 136px;
//   border-radius: 16px;
//   border: 1px solid ${'#4d4759' + Opacity[50]};
//   margin: auto;
//   background-color: ${ColorStyle.BackGround100};
//   text-align: center;
//   cursor: pointer;
// `;

// const PDiv = styled.div`
//   width: 1110px;
//   height: 450px;
//   border-radius: 16px;
//   border: 1px solid #dcdcdc;
//   margin: auto;
//   background-color: ${ColorStyle.BackGround100};
// `;
