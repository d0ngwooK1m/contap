import React from 'react';

import CardFrontWrite from '../components/CardFrontWrite';
import StackSearch from '../components/StackSearch';
import HobbySearch from '../components/HobbySearch';
import { Grid } from '../elements';

const CardEdit = () => {
  return (
    <Grid>
      <Grid>
        <CardFrontWrite />
      </Grid>
      <Grid>
        <StackSearch />
        <HobbySearch />
      </Grid>
    </Grid>
  );
};
export default CardEdit;
