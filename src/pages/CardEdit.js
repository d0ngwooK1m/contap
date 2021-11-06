import React from 'react';

import CardFrontWrite from '../components/CardFrontWrite';
import MypageSearch from '../components/MypageSearch';
import { Grid } from '../elements';

const CardEdit = () => {
  return (
    <Grid>
      <Grid>
        <CardFrontWrite />
      </Grid>
      <Grid>
        <MypageSearch />
      </Grid>
    </Grid>
  );
};
export default CardEdit;
