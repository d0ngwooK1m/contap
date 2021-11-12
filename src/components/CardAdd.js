/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { isSuccess } from '../features/cards/actions';

import { Grid } from '../elements';
import CardPortfolio from './CardPortfolio';
import CardBackWrite from './CardBackWrite';
import { ReactComponent as AddRound } from '../svgs/AddRound.svg';
import {
  FontFamily,
  FontScale,
  ColorStyle,
  Opacity,
} from '../utils/systemDesign';

const CardAdd = () => {
  const dispatch = useDispatch();
  const cardListCheck = useSelector((state) => state.cards.allIds);
  const cardList = useSelector((state) => state.cards);
  // const [click, setClick] = React.state('');

  const handleClick = useSelector((state) => state.cards.isSuccess);
  const [display, setDisplay] = React.useState({ display: 'flex' });
  console.log(display);

  console.log(cardList);
  if (cardListCheck.length === 0) {
    return (
      <Grid width="100%" height="100%" padding="0px 0px 10% 0px;">
        <Div
          onClick={() => {
            dispatch(isSuccess(!handleClick));
            setDisplay({ display: 'none' });
          }}
        >
          <AddRound />
        </Div>
      </Grid>
    );
  } else {
    return (
      <Grid>
        {cardList.allIds.map((cardId) => {
          return (
            <Grid key={cardId}>
              <CardPortfolio cardId={cardId} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
};

export default CardAdd;

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

// const PDiv = styled.div`
//   width: 1110px;
//   height: 450px;
//   border-radius: 16px;
//   border: 1px solid #dcdcdc;
//   margin: auto;
//   background-color: ${ColorStyle.BackGround100};
// `;
