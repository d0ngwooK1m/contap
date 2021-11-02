import React from 'react';

import { useDispatch } from 'react-redux';
import { loadMyCardDB } from '../features/cards/actions';

import CardProfile from '../components/CardProfile';
import CardAdd from '../components/CardAdd';
// import CardBackWrite from '../components/CardBackWrite';

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
        <CardAdd />
      </Grid>
      {/* <Grid>
        <CardBackWrite />
      </Grid> */}
    </Grid>
  );
};

export default Mypage;
