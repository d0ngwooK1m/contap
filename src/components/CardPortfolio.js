import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { history } from '../features/configureStore';

import { Grid } from '../elements';

const CardPortfolio = () => {
  const cardList = useSelector((state) => state.cards.cardList);
  console.log(cardList);
  if (cardList.length === 0) {
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
  return <Grid>리스트 있음</Grid>;
};

export default CardPortfolio;

const Btn = styled.button`
  width: 80px;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;
