import React from 'react';
import { Grid } from '../elements';
import CardBack from './CardBack';
import CardFront from './CardFront';

import TapForm from './TapForm';

const CardBundle = () => {
  return (
    <Grid>
      <CardFront />
      <Grid>
        <CardBack />
      </Grid>
      <TapForm />
    </Grid>
  );
};

export default CardBundle;
