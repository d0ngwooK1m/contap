import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { history } from '../features/configureStore';

import { Grid } from '../elements';
import CardPortfolio from './CardPortfolio';

const CardAdd = () => {
  const cardListCheck = useSelector((state) => state.cards.cardList);
  const cardList = useSelector((state) => state.cards);
  console.log(cardList);
  if (cardListCheck.length === 0) {
    return (
      <Grid>
        <Btn
          onClick={() => {
            history.push('/write');
          }}
        >
          프로젝트 추가하기
        </Btn>
        <Grid
          width="960px"
          height="510px"
          borderRadius="16px"
          border="1px solid #dcdcdc"
          bgcolor="background.paper"
          margin="auto"
        >
          +
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid>
      <Btn
        onClick={() => {
          history.push('/write');
        }}
      >
        프로젝트 추가하기
      </Btn>
      {cardList.allIds.map((cardId) => {
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

const Btn = styled.button`
  width: 80px;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;
