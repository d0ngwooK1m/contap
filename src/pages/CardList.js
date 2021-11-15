// /* eslint-disable */
import React from 'react';
// import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { loadCardFrontDB } from '../features/cards/actions';
import { MemoizedCardFront } from '../components/CardFront';
import SearchBar from '../components/SearchBar';
import { Text } from '../elements';

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

  return (
    <div style={{ paddingBottom: '112px', maxWidth: '1440px' }}>
      <TitleWrap>
        <Text bold48> Just Tap!</Text>
        <Text regular20> 내가 찾던 동료를 탭해서 만나보세요</Text>
      </TitleWrap>
      <SearchBarWrap>
        <SearchBar />
      </SearchBarWrap>
      <TextWrap>
        <div>
          <Text bold32> 동료를 찾고 있나요?</Text>
          <Text bold32> 탭! 해보세요</Text>
        </div>
      </TextWrap>
      <RefreshWrapper>
        <RefreshBtn
          type="button"
          onClick={() => {
            dispatch(loadCardFrontDB());
          }}
        >
          카드 새로고침
        </RefreshBtn>
      </RefreshWrapper>
      <CardListWrap>
        {cardList.allIds.map((userId) => {
          return <MemoizedCardFront key={userId} userId={userId} />;
        })}
      </CardListWrap>
    </div>
  );
};

const TitleWrap = styled.div`
  margin-top: 54px;
  text-align: center;
  p {
    margin: 24px 0px 8px 0px;
  }
`;

const SearchBarWrap = styled.div`
  text-align: center;
  margin: 44px 0px 120px 0px;
`;

const TextWrap = styled.div`
  height: 230px;
  div {
    text-align: center;
    padding-top: 70px;
    p {
      margin: 8px 0px;
    }
  }
`;

const RefreshWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

const RefreshBtn = styled.button`
  margin-right: 170px;
  cursor: pointer;
  background-color: #0f0a1a;
  color: #a09bac;
  border: none;
`;

const CardListWrap = styled.div`
  width: 100%;
  display: flex;
  width: 1140px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
`;
export default CardList;

// const Div = styled.div`
//   display: grid;
//   grid-gap: 64px;
//   grid-template-columns: repeat(3, minmax(auto, 1fr));
//   align-items: center;
//   // 최대넓이 설정
//   max-width: 1110px;
//   justify-content: space-around;
//   // 양 옆 여백 간격 통일 - 가운데 정렬
//   margin: auto;
// `;
