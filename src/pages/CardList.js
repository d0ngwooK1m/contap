import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { loadCardFrontDB } from '../features/cards/actions';
import CardFront from '../components/CardFront';
import TapForm from '../components/TapForm';
import { Grid } from '../elements';

const CardList = () => {
  const dispatch = useDispatch();

  const cardList = useSelector((state) => state.cards);

  React.useEffect(() => {
    if (cardList.allIds.length !== 0) {
      return;
    }
    dispatch(loadCardFrontDB());
  }, []);

  return (
    <Grid>
      <Div>
        {cardList.allIds.map((id) => {
          return (
            <Grid>
              <CardFront key={id} id={id} />
            </Grid>
          );
        })}
      </Div>
      <TapForm />
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
