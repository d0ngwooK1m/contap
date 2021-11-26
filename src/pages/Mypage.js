import React from 'react';
// import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import {
  loadMyCardDB,
  //  isSuccess
} from '../features/cards/actions';
// import { history } from '../features/configureStore';

import CardProfile from '../components/CardProfile';
import CardAdd from '../components/CardAdd';
// import CardBackWrite from '../components/CardBackWrite';
import EmptyBox from '../components/EmptyBox';

// import { FontFamily, FontScale, ColorStyle } from '../utils/systemDesign';
import { Grid } from '../elements';

const Mypage = () => {
  const dispatch = useDispatch();
  const cardCount = useSelector((state) => state.cards.backCardIdx);
  // const handleClick = useSelector((state) => state.cards.isSuccess);
  // console.log(handleClick);

  // const [click, setClick] = React.useState(false);

  // const closeClick = () => {
  //   setClick(false);
  // };

  React.useEffect(async () => {
    await dispatch(loadMyCardDB());
  }, []);

  if (cardCount?.length === 0) {
    return (
      <div style={{ paddingTop: '88px' }}>
        <Grid>
          <CardProfile />
        </Grid>
        <Grid width="100%" height="100%" bg="#0F0a1A">
          <Grid>
            <EmptyBox />
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '88px' }}>
      <Grid>
        <CardProfile />
      </Grid>
      <Grid width="100%" height="100%" bg="#0F0a1A">
        <Grid>
          <CardAdd />
        </Grid>
      </Grid>
    </div>
  );
};

export default Mypage;
