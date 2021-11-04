import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import axios from 'axios';
import { saveToken } from '../utils/auth';
import { login as loginAction } from '../features/user/actions';

import { loadCardFrontDB } from '../features/cards/actions';
// import CardFront from '../components/CardFront';
import { MemoizedCardFront } from '../components/CardFront';
// import CardFront from '../components/CardFront';
import SearchBar from '../components/SearchBar';
import { Grid } from '../elements';

const baseURL = process.env.REACT_APP_SERVER_URI;

const CardList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

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

  React.useEffect(() => {
    if (!location.search) {
      return null;
    }
    const query = location.search;
    const code = query.split('=')[1];
    console.log(code);

    async function handleKakaoLogin() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${baseURL}/user/kakao?code=${code}`,
        });
        console.log(data);
        saveToken(data.token);
        dispatch(loginAction({ email: data.email, userName: data.userName }));
        history.replace('/');
      } catch (error) {
        console.error(error);
      }
    }
    return handleKakaoLogin();
  }, []);

  console.log(cardList);
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
