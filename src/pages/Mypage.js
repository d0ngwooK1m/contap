import React from 'react';

import { useDispatch } from 'react-redux';
import { loadMyCardDB } from '../features/cards/actions';

import CardProfile from '../components/CardProfile';
import CardPortfolio from '../components/CardPortfolio';
import CardBackWrite from '../components/CardBackWrite';

import { Grid } from '../elements';

const Mypage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadMyCardDB());
  }, []);

  return (
    <Grid>
      <Grid>
        <CardProfile />
      </Grid>
      <Grid>
        <CardPortfolio />
      </Grid>
      <Grid>
        <CardBackWrite />
      </Grid>
    </Grid>
  );
};

export default Mypage;
