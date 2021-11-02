import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { Grid, Text } from '../elements';

const CardPortfolio = ({ cardId }) => {
  const cardList = useSelector((state) => state.cards.byId);
  console.log(cardList);
  return (
    <Grid>
      <Grid
        width="960px"
        height="510px"
        borderRadius="16px"
        border="1px solid #dcdcdc"
        bgcolor="background.paper"
        margin="auto"
      >
        <Text>{cardList[cardId].title}</Text>
        <Text>{cardList[cardId].content}</Text>
        <Text>{cardList[cardId].tagsStr}</Text>
        <Text>{cardList[cardId].link}</Text>
      </Grid>
    </Grid>
  );
};

CardPortfolio.propTypes = {
  cardId: PropTypes.number.isRequired,
};

export default CardPortfolio;
