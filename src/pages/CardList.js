import React from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// import CardBundle from '../components/CardBundle';
import CardFront from '../components/CardFront';
import { Grid } from '../elements';

import { loadCardDB } from '../features/cards/actions';

const CardList = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const cardList = useSelector((state) => state.cards);

  React.useEffect(() => {
    if (cardList.allIds.length !== 0) {
      return;
    }

    dispatch(loadCardDB(String(0)));
  }, []);

  return (
    <Grid>
      <Div>
        {cardList.allIds.map((id) => {
          return <CardFront key={id} id={id} />;
        })}
      </Div>
    </Grid>
  );
};

export default CardList;

const Div = styled.div`
  display: grid;
  grid-gap: 64px;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  align-items: center;
  // 최대넓이 설정
  max-width: 1110px;
  justify-content: space-around;
  // 양 옆 여백 간격 통일 - 가운데 정렬
  margin: auto;
`;
