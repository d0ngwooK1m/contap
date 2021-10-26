import React from 'react';
import { Grid } from '../elements';
import CardBack from './CardBack';
import CardFront from './CardFront';

const CardBundle = () => {
  return (
    // 대체 왜 Grid로 각각해주는건 안되는것인가....
    <Grid>
      <CardFront />
      <CardBack />
    </Grid>
  );
};

export default CardBundle;
