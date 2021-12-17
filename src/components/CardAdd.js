/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { useSelector, useDispatch } from 'react-redux';

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
  const cardCount = useSelector((state) => state.cards.backCardIdx);
  // const cardListCheck = useSelector((state) => state.cards.allIds);
  const cardList = useSelector((state) => state.cards);

  const [click, setClick] = React.useState(false);

  const closeClick = () => {
    setClick(false);
  };

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
        <TextDiv>
          <TitleText>
            나의 카드 <Count>{cardCount.length}</Count>
          </TitleText>
          <TextBtn
            onClick={() => {
              if (cardCount.length === 10) {
                Swal.fire({
                  icon: 'error',
                  title: '작성 실패',
                  text: '카드는 10개까지만 작성 가능합니다!',
                });

                return false;
              }
              setClick(true);
            }}
          >
            + 카드 추가하기
          </TextBtn>
        </TextDiv>
        {cardList.backCardIdx.map((cardId) => {
          return (
            <Grid key={cardId}>
              <CardPortfolio cardId={cardId} />
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
          나의 카드 <Count>{cardCount.length}</Count>
        </TitleText>
        <TextBtn
          onClick={() => {
            if (cardCount.length === 10) {
              Swal.fire({
                icon: 'error',
                title: '작성 실패',
                text: '카드는 10개까지만 작성 가능합니다!',
              });

              return false;
            }
            setClick(true);
          }}
        >
          + 카드 추가하기
        </TextBtn>
      </TextDiv>
      <Grid margin="0px 0px 48px 0px">
        <CardBackWrite onHide={closeClick} />
      </Grid>
      {cardList.backCardIdx.map((cardId) => {
        return (
          <Grid key={cardId}>
            <CardPortfolio cardId={cardId} />
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
  margin: 0px 165px;
`;

const TitleText = styled.p`
  font-size: ${FontScale.Header_24};
  font-family: ${FontFamily};
  margin: 68px 0px 52px 0px;
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
  margin: 68px 0px 52px 0px;
  font-weight: 700;
  text-align: end;
  z-index: 3;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;
