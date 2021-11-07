import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadMyCardDB } from '../features/cards/actions';
// import { history } from '../features/configureStore';

import CardProfile from '../components/CardProfile';
import CardAdd from '../components/CardAdd';
import CardBackWrite from '../components/CardBackWrite';

import { Grid, Text } from '../elements';

const Mypage = () => {
  const dispatch = useDispatch();

  const cardCount = useSelector((state) => state.cards.allIds);
  console.log(cardCount.length);

  const [click, setClick] = React.useState(false);

  const getClick = (c) => {
    setClick(c);
  };

  React.useEffect(() => {
    dispatch(loadMyCardDB());
  }, []);

  if (click) {
    return (
      <Grid>
        <Grid>
          <CardProfile />
        </Grid>
        <Div>
          <Text>나의 프로젝트 {cardCount.length}</Text>
          <Btn
            onClick={() => {
              setClick(!click);
            }}
          >
            프로젝트 추가하기
          </Btn>
        </Div>
        <Grid>
          <CardBackWrite getClick={getClick} />
        </Grid>
        <Grid>
          <CardAdd />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid>
      <Grid>
        <CardProfile />
      </Grid>
      <Div>
        <Text>나의 프로젝트 {cardCount.length}</Text>
        <Btn
          onClick={() => {
            setClick(!click);
            // history.push('/write');
          }}
        >
          프로젝트 추가하기
        </Btn>
      </Div>
      <Grid>
        <CardAdd />
      </Grid>
    </Grid>
  );
};

export default Mypage;

const Div = styled.div`
  width: 1110px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 90px;
`;

const Btn = styled.button`
  width: 80px;
  // position: fixed;
  // top: 16vh;
  // left: 47vw;
`;
