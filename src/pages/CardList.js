/* eslint-disable */
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FontFamily } from '../utils/systemDesign';

import styled from 'styled-components';
import { loadCardFrontDB } from '../features/cards/actions';
import { MemoizedCardFront } from '../components/CardFront';
import SearchBar from '../components/SearchBar';
import { Text } from '../elements';
import { ReactComponent as TitleBgSvg } from '../svgs/TitleBG.svg';
import { ReactComponent as SquareShadow } from '../svgs/Reflex.svg';
import { ReactComponent as SquareLeft } from '../svgs/ShapeLeft.svg';
import { ReactComponent as SquareRight } from '../svgs/ShapeRight.svg';

const CardList = () => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.cards);
  const isSearching = useSelector((state) => state.cards.isSearching);
  // const isAuthorized = useSelector((state) => state.user.isAuthorized);

  React.useEffect(async () => {
    if (cardList.allIds.length !== 0) {
      return;
    }
    if (!isSearching) {
      dispatch(loadCardFrontDB());
    }
  }, [isSearching]);

  return (
    <Wrap>
      <div className="SquareShadow">
        <SquareShadow />
      </div>
      <div className="SquareLeft">
        <SquareLeft />
      </div>
      <div className="SquareRight">
        <SquareRight />
      </div>
      {/* <div className="TitleBgSvg">
        <TitleBgSvg />
      </div> */}
      <TitleWrap >
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
        <FlexWrapper>
        <RefreshSvg />
        <RefreshBtn
          type="button"
          onClick={() => {
            dispatch(loadCardFrontDB());
          }}
        >
          
          카드 섞기
        </RefreshBtn>
        </FlexWrapper>
      </RefreshWrapper>
      <CardListWrap>
        {cardList.allIds.map((userId) => {
          return <MemoizedCardFront key={userId} userId={userId} />;
        })}
      </CardListWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding-top: 76px;
  padding-bottom: 112px;
  position: relative;
  z-index: 99;

  .SquareLeft {
    position: absolute;
    top:80px;
    left: 130px;
    z-index: 1;
  }
  .SquareShadow {
    position: absolute;
    top:268px;
    left: 130px;
    z-index: 1;
  }
  .SquareRight {
    position: absolute;
    top:32px;
    right: 130px;
    z-index: 1;
  }
  .TitleBgSvg{
    position: absolute;
    top: 0px;
    z-index: 9699;
  }
`;

const TitleWrap = styled.div`
  text-align: center;
  p {
    margin-bottom: 24px;
  }

`;

const SearchBarWrap = styled.div`
  text-align: center;
  margin: 20px 0px 50px 0px;
`;

const TextWrap = styled.div`
  div {
    text-align: center;
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

const FlexWrapper = styled.div`
  display: flex;
`;

const RefreshBtn = styled.button`
  margin-right: 170px;
  margin-top: 18px;
  cursor: pointer;
  background-color: #0f0a1a;
  color: #a09bac;
  font-family: ${FontFamily};
  font-size: 20px;
  border: none;
`;

const CardListWrap = styled.div`
  width: 100%;
  display: flex;
  width: 1140px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
  padding-left: 30px;
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
