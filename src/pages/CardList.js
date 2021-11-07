// /* eslint-disable */
import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { loadCardFrontDB } from '../features/cards/actions';
import { MemoizedCardFront } from '../components/CardFront';
import SearchBar from '../components/SearchBar';
import { Grid } from '../elements';
import useSocketNotiRoom from '../hooks/useSocketNotiRoom';

const CardList = () => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.cards);
  const isSearching = useSelector((state) => state.cards.isSearching);
  const [wsConnectSubscribe, wsDisConnectUnsubscribe, token] =
    useSocketNotiRoom();
  React.useEffect(() => {
    if (cardList.allIds.length !== 0) {
      return;
    }
    if (!isSearching) {
      dispatch(loadCardFrontDB());
    }
  }, [isSearching]);

  React.useEffect(() => {
    if (!token) {
      return null;
    }
    wsConnectSubscribe();

    return () => {
      wsDisConnectUnsubscribe();
    };
  }, []);

  return (
    <Grid>
      <SearchBar />
      <Div>
        {cardList.allIds.map((userId) => {
          return <MemoizedCardFront key={userId} userId={userId} />;
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
