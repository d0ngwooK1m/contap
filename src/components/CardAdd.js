/* eslint-disable */
import React from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '../elements';
import CardPortfolio from './CardPortfolio';

const CardAdd = () => {
  const cardListCheck = useSelector((state) => state.cards.cardList);
  const cardList = useSelector((state) => state.cards);
  // const [click, setClick] = React.state('');

  console.log(cardList);
  if (cardListCheck.length === 0) {
    return (
      <Grid>
        <Grid
          width="1110px"
          height="136px"
          borderRadius="16px"
          border="1px solid #dcdcdc"
          bgcolor="background.paper"
          margin="auto"
        >
          +
        </Grid>
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
