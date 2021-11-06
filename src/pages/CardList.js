/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import StompJs from 'stompjs';
import SockJS from 'sockjs-client';
import { getToken } from '../utils/auth';

import { loadCardFrontDB } from '../features/cards/actions';
import { MemoizedCardFront } from '../components/CardFront';
import SearchBar from '../components/SearchBar';
import { Grid } from '../elements';

const baseURL = process.env.REACT_APP_SERVER_URI;

const CardList = () => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.cards);
  const isSearching = useSelector((state) => state.cards.isSearching);

  React.useEffect(() => {
    if (cardList.allIds.length !== 0) {
      return;
    }
    if (!isSearching) {
      dispatch(loadCardFrontDB());
    }
  }, [isSearching]);

  const userInfo = useSelector((state) => state.user);

  const sock = new SockJS(`${baseURL}/ws-stomp`);
  const ws = StompJs.over(sock);
  const token = getToken();

  const wsConnectSubscribe = React.useCallback(() => {
    if (!token) {
      return null;
    }
    try {
      ws.connect({}, () => {
        ws.subscribe(
          `/user/sub/user`,
          {},
          { token, userEmail: userInfo.email },
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // token이 있으면 소켓 연결

  const wsDisConnectUnsubscribe = React.useCallback(() => {
    try {
      ws.disconnect(
        () => {
          ws.unsubscribe('sub-0');
        },
        // { token }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

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
