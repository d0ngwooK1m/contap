import React from 'react';
import CardBackWrite from '../components/CardBackWrite';
import CardFrontWrite from '../components/CardFrontWrite';

import { Grid } from '../elements';

const Mypage = () => {
  return (
    <Grid>
      <Grid>
        <CardFrontWrite />
      </Grid>
      <Grid>
        <CardBackWrite />
      </Grid>
    </Grid>
  );
};

export default Mypage;
