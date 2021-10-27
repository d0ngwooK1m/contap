import React from 'react';
import { Grid } from '../elements';
import CardBack from './CardBack';
import CardFront from './CardFront';

import TapForm from './TapForm';

const CardBundle = () => {
  return (
    // 대체 왜 Grid로 각각해주는건 안되는것인가....
    <Grid>
      <CardFront />
      <CardBack />
      <TapForm />
    </Grid>
  );
};

export default CardBundle;
